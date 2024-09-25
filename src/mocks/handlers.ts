import {http, HttpResponse} from 'msw';

export const handlers = [
  http.get(`/api/test`, () => {
    console.log('test');
    return HttpResponse.json([{data: 'test'}, {data: 'test2'}], {});
  }),
];
