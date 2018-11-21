import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="displayLogin"><app-login></app-login></div>
    <div *ngIf="!displayLogin">
      <div fxLayout="row" style="margin-top: 50px">
        <div fxFlex></div>
        <div fxFlex="66%" fxLayout="column" fxLayoutAlign="center center">
          <div fxFlex>
            <h2 class="mat-display-3" style="text-align: center">
              Welcome to VOA Mobile Admin
            </h2>
          </div>
          <div fxFlex fxLayout="column" fxLayoutAlign="center center">
            <div fxFlex class="mat-body-2">Start by</div>
            <div fxFlex>
              <button mat-raised-button color="accent" routerLink="/user/send-pn">
                Sending Push Notifications
              </button>
            </div>
          </div>
        </div>
        <div fxFlex></div>
      </div>
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
