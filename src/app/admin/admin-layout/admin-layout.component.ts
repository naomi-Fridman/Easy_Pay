import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
selectedOption:number
items3: MenuItem[]
  selectedItem: number=0
  constructor(private router:Router) { }
  newLoan(){
    this.router.navigate(["/newLoan"]);
  }
  
  ngOnInit() {
    this.items3 = [
      {label: 'דף הבית'  , command: (event) => {this.selectedItem=0 }},
      {label: 'הלוואות'  , command: (event) => {this.selectedItem=1 }},
      {label: 'הפקדות' ,  command: (event) => {this.selectedItem=2 } },
      {label: 'משתמשים' , icon: 'pi pi-users'  , command: (event) => {this.selectedItem=3}},
      {label: 'תשלומים' , command: (event) => {this.selectedItem=4}}
  ];
  }
}
