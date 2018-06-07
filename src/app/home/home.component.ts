import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="displayLogin">
      <app-login></app-login>
    </div>
    <div *ngIf="!displayLogin">
     <a mat-button routerLink="/user/send-pn">
        Send Push Notifications
      </a>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private _displayLogin = true
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this._displayLogin = !authStatus.isAuthenticated)
    )
  }

  get displayLogin() {
    return this._displayLogin
  }
}
