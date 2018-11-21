import { Component, OnInit, ViewChild } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry, MatSidenav } from '@angular/material'
import { AuthService } from './auth/auth.service'
import { ObservableMedia } from '@angular/flex-layout'

@Component({
  selector: 'app-root',
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .app-is-mobile .app-toolbar {
        position: fixed;
        z-index: 2;
      }
      .app-sidenav-container {
        flex: 1;
      }
      .app-is-mobile .app-sidenav-container {
        flex: 1 0 auto;
      }
      mat-sidenav {
        width: 200px;
      }
    `,
  ],
  template: `
    <div class="app-container">
      <mat-toolbar
        color="primary"
        fxLayoutGap="8px"
        class="app-toolbar"
        [class.app-is-mobile]="media.isActive('xs')"
      >
        <button *ngIf="displayAccountIcons" mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-icon-button routerLink="/home">
          <mat-icon svgIcon="voa"></mat-icon><span class="mat-h2">VOA Mobile Admin</span>
        </a>
        <span class="flex-spacer"></span>
        <button
          *ngIf="displayAccountIcons"
          mat-mini-fab
          routerLink="/user/profile"
          matTooltip="Profile"
          aria-label="User Profile"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          *ngIf="displayAccountIcons"
          mat-mini-fab
          routerLink="/user/logout"
          matTooltip="Logout"
          aria-label="Logout"
        >
          <mat-icon>lock_open</mat-icon>
        </button>
      </mat-toolbar>
      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="media.isActive('xs') ? 'over' : 'side'"
          [fixedInViewport]="media.isActive('xs')"
          fixedTopGap="56"
        >
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet class="app-container"></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sideNav: MatSidenav
  private _displayAccountIcons = false
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    public media: ObservableMedia
  ) {
    iconRegistry.addSvgIcon(
      'voa',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/voa.svg')
    )
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(authStatus => {
      // HACK: setTimeout mitigates ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this._displayAccountIcons = authStatus.isAuthenticated
        if (!authStatus.isAuthenticated) {
          this.sideNav.close()
        }
      }, 0)
    })
  }

  get displayAccountIcons() {
    return this._displayAccountIcons
  }
}
