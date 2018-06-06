import { Injectable } from '@angular/core'
import { IPushNotification } from './push-notification'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError as observableThrowError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { CacheService } from '../../auth/cache.service'
import { environment } from '../../../environments/environment'
import { transformError } from '../../common/common'

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService extends CacheService {
  constructor(private httpClient: HttpClient) {
    super()
  }

  send(pn: IPushNotification): Observable<IPushNotification> {
    this.setItem('draft-pn', pn) // cache user data in case of errors
    const updateResponse = this.httpClient
      .put<IPushNotification>(`${environment.baseUrl}/v1/push`, pn)
      .pipe(catchError(transformError))

    updateResponse.subscribe(
      res => {
        this.removeItem('draft-pn')
      },
      err => observableThrowError(err)
    )

    return updateResponse
  }
}
