import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/models/User';
import {InputTextModule} from 'primeng/inputtext';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }
  user:User;
  LogIn(code:string,accesName:string){
    this.loginService.getUserFromServer(code,accesName).subscribe(data=>{
      this.user=data;
    },err=>{
      alert("לא נמצא מידע!!")
      this.user=null;
    });;
  }
  register(){
    
    this.router.navigate(['/register']);
  }
  ngOnInit() {
  }

}
