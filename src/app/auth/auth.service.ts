import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as decode from 'jwt-decode'
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { transformError } from '../common/common'
import { CacheService } from './cache.service'
import { Role } from './role.enum'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from 'firebase'

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>
  login(email: string, password: string): Observable<IAuthStatus>
  logout()
  getToken(): string
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
}

@Injectable()
export class AuthService extends CacheService implements IAuthService {
  private readonly authProvider: (email: string, password: string) => Promise<any>
  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  )
  currentUser = new BehaviorSubject<User>(null)

  constructor(private httpClient: HttpClient, private afAuth: AngularFireAuth) {
    super()
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus))
    this.afAuth.user.subscribe(user => this.currentUser.next(user))
    this.authProvider = this.firebaseAuth
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout()

    const loginResponse = this.authStatus

    this.authProvider(email, password).then(
      res => {
        this.authStatus.next({
          isAuthenticated: true,
          userRole: Role.Admin,
          userId: res.user.uid,
        })
      },
      err => {
        this.logout()
        return observableThrowError(err.message)
      }
    )

    // .pipe(
    //   map(value => {
    //     this.setToken(value.accessToken)
    //     return decode(value.accessToken) as IAuthStatus
    //   }),
    //   catchError(transformError)
    // )

    return loginResponse
  }

  private firebaseAuth(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.afAuth.auth.signOut()
    this.clearToken()
    this.authStatus.next(defaultAuthStatus)
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'))
  }

  getToken(): string {
    return this.getItem('jwt') || ''
  }

  private clearToken() {
    this.removeItem('jwt')
  }
}
