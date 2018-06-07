import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from './profile/profile.component'
import { LogoutComponent } from './logout/logout.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { SendPushNotificationComponent } from './send-push-notification/send-push-notification.component'

const routes: Routes = [
  { path: 'send-pn', component: SendPushNotificationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
