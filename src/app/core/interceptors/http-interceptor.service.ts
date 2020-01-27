import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(req).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              return next.handle(req);
            }
          },
          (err: HttpErrorResponse) => {
            if (err.error.statusCode === 401) {
              console.error(err);
              return this.router.navigate(['auth']);
            }
          },
        ),
      );
    }
    return next.handle(req);
  }
}
