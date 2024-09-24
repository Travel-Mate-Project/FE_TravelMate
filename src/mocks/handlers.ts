import {http, HttpResponse} from 'msw';

export const handlers = [
  http.post('/api/test', () => {
    console.log('test');
    return HttpResponse.json([], {});
  }),
];
