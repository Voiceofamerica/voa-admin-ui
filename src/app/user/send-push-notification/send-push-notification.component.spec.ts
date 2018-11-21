import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SendPushNotificationComponent } from './send-push-notification.component'
import {
  commonTestingProviders,
  commonTestingModules,
} from 'src/app/common/common.testing'
import { UserMaterialModule } from '../user.material.module'

describe('SendPushNotificationComponent', () => {
  let component: SendPushNotificationComponent
  let fixture: ComponentFixture<SendPushNotificationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendPushNotificationComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules.concat(UserMaterialModule),
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPushNotificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
