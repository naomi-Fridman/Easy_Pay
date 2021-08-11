import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuarantyDetailsComponent } from './guaranty-details/guaranty-details.component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [GuarantyDetailsComponent],
  imports: [
    CommonModule,AccordionModule,ButtonModule,BrowserModule,
    FormsModule,
    ReactiveFormsModule,InputTextModule,ToastModule,AutoCompleteModule
  ],
  exports:[GuarantyDetailsComponent]
})
export class GuarantyModule { }
