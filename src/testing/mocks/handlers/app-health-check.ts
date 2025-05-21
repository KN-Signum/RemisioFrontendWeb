import { http, HttpResponse } from 'msw';

const healthCheckResponse = http.get(`/health`, () => {
  return HttpResponse.json({
    message: 'Service is running',
  });
});

export const handlers = [healthCheckResponse];
