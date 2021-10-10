import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-try-out',
  templateUrl: './form-try-out.component.html',
  styleUrls: ['./form-try-out.component.css']
})
export class FormTryOutComponent implements OnInit {

  constructor() { }

  user={
    firstName:"",
  }
  ngOnInit() {
  }

}
