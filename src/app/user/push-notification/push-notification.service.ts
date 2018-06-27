import { Injectable } from '@angular/core'
import { IPushNotification } from './push-notification'
import { HttpClient } from '@angular/common/http'
import {
  Observable,
  throwError as observableThrowError,
  AsyncSubject,
  from as fromPromise,
  of,
} from 'rxjs'
import { CacheService } from '../../auth/cache.service'
import * as firebase from 'firebase/app'
import 'firebase/functions'
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators'
import { transformError } from '../../common/common'
import { HttpsCallableResult } from '@firebase/functions-types'

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService extends CacheService {
  constructor(private httpClient: HttpClient) {
    super()
  }

  clearCache() {
    this.removeItem('draft-pn')
  }

  send(pn: IPushNotification): Observable<string | HttpsCallableResult> {
    this.setItem('draft-pn', pn) // cache user data in case of errors

    const sendPushNotification = firebase
      .functions()
      .httpsCallable(environment.functions.sendPushNotification)

    const pushResponse = fromPromise(sendPushNotification(pn)).pipe(
      catchError(transformError)
    )

    pushResponse.subscribe(
      res => {
        this.removeItem('draft-pn')
      },
      err => observableThrowError(err)
    )

    return pushResponse
  }
}
