import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { switchMap, finalize } from 'rxjs/operators';
import { from } from 'rxjs';

export const httpBlockuiInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding token for certain requests (like authentication)
  if (req.url.includes('/login') || req.url.includes('/logout') || req.url.includes('/auth/')) {
    return next(req);
  }

  const authService = inject(AuthService);

  // Add authorization header if user is authenticated
  if (authService.isAuthenticated()) {
    return from(authService.getAccessToken()).pipe(
      switchMap((token) => {
        let authReq = req;

        if (token) {
          authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
        }

        // TODO: Add BlockUI service integration here
        // For now, we'll just pass the request through
        return next(authReq);
      }),
      finalize(() => {
        // TODO: Stop BlockUI here
      })
    );
  }

  return next(req);
};
