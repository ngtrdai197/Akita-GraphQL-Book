import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { tap, catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { IUser, ISession } from '@/shared/interfaces';
import { AuthStore } from '../auth/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authStore: AuthStore,
  ) {}

  me(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${env.HOST}/${env.AUTH.ME}`)
      .pipe(tap(me => this.authStore.update({ me })));
  }

  login({ username, password }: { username: string; password: string }) {
    this.httpClient
      .post<ISession>(`${env.HOST}/${env.AUTH.LOGIN}`, {
        username,
        password,
      })
      .pipe(
        tap(session => {
          const { accessToken, user } = session;
          this.localStorageService.setToken(accessToken);
          this.authStore.update({ accessToken, me: user });
          return this.router.navigate(['']);
        }),
        catchError(err => {
          console.error(err.error);
          return throwError(err.error);
        }),
      )
      .subscribe();
  }
}
