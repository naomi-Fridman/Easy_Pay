import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCurrencyTypeComponent } from './edit-currency-type/edit-currency-type.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditCurrencyTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[EditCurrencyTypeComponent]
})
export class CurrencyModule { }
