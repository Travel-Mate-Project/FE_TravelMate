import {NextRequest, NextResponse} from 'next/server';

const API_BASE_URL = `${process.env.BASE_URL}/api/v1`;

export async function GET(
  request: NextRequest,
  {params}: {params: {path: string[]}},
) {
  return handleRequest(request, 'GET', params.path);
}

export async function POST(
  request: NextRequest,
  {params}: {params: {path: string[]}},
) {
  return handleRequest(request, 'POST', params.path);
}

export async function PUT(
  request: NextRequest,
  {params}: {params: {path: string[]}},
) {
  return handleRequest(request, 'PUT', params.path);
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: {path: string[]}},
) {
  return handleRequest(request, 'DELETE', params.path);
}

export async function PATCH(
  request: NextRequest,
  {params}: {params: {path: string[]}},
) {
  return handleRequest(request, 'PATCH', params.path);
}

async function handleRequest(
  request: NextRequest,
  method: string,
  path: string[],
) {
  const endPoint = '/' + path.join('/');
  const url = `${API_BASE_URL}${endPoint}`;

  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      {message: 'Unauthorized: No token.'},
      {status: 401},
    );
  }

  try {
    const response = await fetchWithToken(url, method, accessToken, request);
    return NextResponse.json(await response.json(), {status: response.status});
  } catch (error) {
    if (error instanceof Response && error.status === 401) {
      try {
        const {newAccessToken, newRefreshToken} =
          await refreshAccessToken(refreshToken);
        const retryResponse = await fetchWithToken(
          url,
          method,
          newAccessToken,
          request,
        );
        const data = await retryResponse.json();

        const response = NextResponse.json(data, {
          status: retryResponse.status,
        });
        setCookie(response, 'token', newAccessToken);
        setCookie(response, 'refreshToken', newRefreshToken);
        return response;
      } catch (refreshError) {
        const response = NextResponse.json(
          {message: 'Authentication failed'},
          {status: 401},
        );
        clearAuthCookies(response);
        return response;
      }
    }
    console.error('Error in backEnd server:', error);
    return NextResponse.json({message: 'check out terminal'}, {status: 500});
  }
}

async function fetchWithToken(
  url: string,
  method: string,
  token: string,
  originalRequest: NextRequest,
): Promise<Response> {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(await originalRequest.json());
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw response;
  }

  return response;
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<{newAccessToken: string; newRefreshToken: string}> {
  const response = await fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({refreshToken}),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return {newAccessToken: data.accessToken, newRefreshToken: data.refreshToken};
}

function setCookie(response: NextResponse, name: string, value: string) {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete('token');
  response.cookies.delete('refreshToken');
}
