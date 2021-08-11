import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }
  deposit(){
    this.router.navigate(['/deposit']);
  }
  loan(){
    this.router.navigate(['/loan']);
  }
  ngOnInit() {
  }

}
