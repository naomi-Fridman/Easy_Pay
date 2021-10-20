import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {
  submitted: boolean = false;
  name = 'Angular';
  
  @ViewChild('myModal', { static: true }) myModal: ElementRef;
  constructor() { }
  ngOnInit() { }
  ngAfterViewInit() {
    this.myModal.nativeElement.click();;
  }
  // open() {
  //   this.submitted = true;
  // }
}
























