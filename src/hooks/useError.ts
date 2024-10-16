import {useCallback} from 'react';

interface ErrorResponse {
  status: number;
  message: string;
}

export const useError = () => {
  return useCallback((error: unknown) => {
    console.error('An error occurred:', error);

    if (typeof error === 'object' && error !== null && 'status' in error) {
      const errorResponse = error as ErrorResponse;

      switch (errorResponse.status) {
        case 400:
          console.error(
            'Bad Request: The request was unacceptable, often due to missing a required parameter.',
          );
          break;
        case 401:
          console.error('Unauthorized: No valid API key provided.');
          // 여기서 로그아웃 처리나 로그인 페이지로 리다이렉트 등을 수행할 수 있습니다.
          break;
        case 403:
          console.error(
            "Forbidden: The API key doesn't have permissions to perform the request.",
          );
          break;
        case 404:
          console.error("Not Found: The requested resource doesn't exist.");
          break;
        case 500:
          console.error('Server Errors: Something went wrong on our end.');
          break;
        default:
          console.error('An unknown error occurred.');
      }
    } else {
      console.error('An unknown error occurred.');
    }
  }, []);
};
