import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Subject, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const apiKey = 'AIzaSyDiI9lpB1p2mSJjuTJpaKgeXjoX0-Pt4Hk';
const returnSecureToken = true;
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        { email, password, returnSecureToken }
      )
      .pipe(catchError(this.handleError));
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadeduser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadeduser.token) {
      this.user.next(loadeduser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }
  autoLogout(expirationTokenDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTokenDuration);
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        { email, password, returnSecureToken }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!error.error || !error.error.error) return throwError(error);
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
