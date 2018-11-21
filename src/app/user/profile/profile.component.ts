import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../auth/auth.service'
import { Role } from '../../auth/role.enum'
import { User } from 'firebase'

@Component({
  selector: 'app-profile',
  template: `
    <mat-toolbar color="accent"> <h5>User Profile</h5> </mat-toolbar>
    <mat-card *ngIf="this.currentUser">
      <mat-card-header>
        <div mat-card-avatar><mat-icon>account_circle</mat-icon></div>
        <mat-card-title>{{ currentUser.displayName }}</mat-card-title>
        <mat-card-subtitle>{{ currentUser.email }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p><span class="mat-input bold">E-mail Verification Status</span></p>
        <p>{{ currentUser.emailVerified }}</p>
      </mat-card-content>
      <mat-card-actions *ngIf="editMode">
        <button mat-button mat-raised-button>Edit</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .bold {
        font-weight: bold;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  editMode = false
  currentUserRole = Role.None
  currentUser: User

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentUserRole = authStatus.userRole)
    )
    this.authService.currentUser.subscribe(user => (this.currentUser = user))
  }
}
