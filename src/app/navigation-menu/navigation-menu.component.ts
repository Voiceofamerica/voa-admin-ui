import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-navigation-menu',
  styles: [
    `
      .active-link {
        font-weight: bold;
        border-left: 3px solid green;
      }
    `,
  ],
  template: `
    <mat-nav-list>
      <h3 matSubheader>Mobile Apps</h3>
      <a mat-list-item routerLinkActive="active-link" routerLink="/user/send-pn"
        >Send Push Notifications</a
      >
      <h3 matSubheader>System</h3>
      <a mat-list-item routerLinkActive="active-link" routerLink="/user/profile"
        >Profile</a
      >
      <a mat-list-item routerLinkActive="active-link" routerLink="/user/logout">Logout</a>
    </mat-nav-list>
  `,
})
export class NavigationMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
