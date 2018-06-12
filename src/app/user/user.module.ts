import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { LogoutComponent } from './logout/logout.component'
import { MaterialModule } from '../material.module'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AuthGuard } from '../auth/auth-guard.service'
import { UserMaterialModule } from './user.material.module'
import { SendPushNotificationComponent } from './send-push-notification/send-push-notification.component'
import { PushNotificationService } from './push-notification/push-notification.service'
import { DateValueAccessorDirective } from '../common/date-value-accessor'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserMaterialModule,
  ],
  declarations: [
    ProfileComponent,
    LogoutComponent,
    SendPushNotificationComponent,
    DateValueAccessorDirective,
  ],
  providers: [AuthGuard, PushNotificationService],
})
export class UserModule {}
