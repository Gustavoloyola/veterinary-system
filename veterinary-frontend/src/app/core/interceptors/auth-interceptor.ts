import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const isBackendRequest =
    request.url.startsWith(
  'https://ve-0e2bd784d9fe4afb9a3d91f44adba958.ecs.us-east-2.on.aws'
) ||
request.url.startsWith(
  'https://ve-158dd3ec9d0b49db8d3b08b5a109f490.ecs.us-east-2.on.aws'
)

  if (!token || !isBackendRequest) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authenticatedRequest);
};
