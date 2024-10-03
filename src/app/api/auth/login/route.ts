import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  console.log('서버 라우트 실행');
  try {
    const {userEmail, password} = await request.json();

    const loginResponse = await fetch(
      `${process.env.BASE_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userEmail, password}),
      },
    );

    const responseData = await loginResponse.json();

    if (!loginResponse.ok) {
      return NextResponse.json(responseData, {status: loginResponse.status});
    }

    const {accessToken, refreshToken} = responseData.data;

    // 응답 생성
    const response = NextResponse.json({success: true}, {status: 200});

    // 보안 쿠키 설정
    const secure = process.env.NODE_ENV === 'production';
    const maxAge = 60 * 60 * 24 * 7; // 7일

    response.cookies.set('token', accessToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      maxAge: maxAge * 4, // 28일
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        code: 'ERROR',
        message: 'check out terminal',
      },
      {status: 500},
    );
  }
}
