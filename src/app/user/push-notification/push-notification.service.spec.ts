import { TestBed, inject } from '@angular/core/testing'

import { PushNotificationService } from './push-notification.service'
import {
  commonTestingProviders,
  commonTestingModules,
} from 'src/app/common/common.testing'

describe('PushNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushNotificationService].concat(commonTestingProviders),
      imports: commonTestingModules,
    })
  })

  it('should be created', inject(
    [PushNotificationService],
    (service: PushNotificationService) => {
      expect(service).toBeTruthy()
    }
  ))
})
