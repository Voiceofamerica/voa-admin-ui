import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDividerModule,
  MatLineModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
} from '@angular/material'

@NgModule({
  imports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class UserMaterialModule {}
