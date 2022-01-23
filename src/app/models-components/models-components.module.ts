import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';



@NgModule({
  declarations: [DialogComponent, SuccessAlertComponent],
  imports: [
    CommonModule
  ],
  exports:[DialogComponent, SuccessAlertComponent]
})
export class ModelsComponentsModule { }
