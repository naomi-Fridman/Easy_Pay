import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  // User:User;
   constructor(private _acr: ActivatedRoute,private userService:UsersService) { }
  // userDetailesForm :FormGroup =new FormGroup({
  //   id:new FormControl(""),
  //   password:new FormControl(""),
  //   userName:new FormControl(""),  
  //   firstName:new FormControl(""),
  //   lastName :new FormControl(""),
  //   identityNumber:new FormControl(""),    
  //   address:new FormControl(""),
  //   city:new FormControl(""),
  //   telephoneNumber1:new FormControl(""),
  //   telephoneNumber2:new FormControl(""),
  //   email :new FormControl(""),    
  //   comments:new FormControl("")
  // });
  ngOnInit() {}


  }
    // this._acr.paramMap.subscribe(params => {
    //   this.User=JSON.parse(params.get("")) ;
    // this.userDetailesForm.controls["userName"].setValue(this.User.user.userName);
      // this.userDetailesForm.controls["id"].setValue(this.User.user.id);
      // this.userDetailesForm.controls["password"].setValue(this.User.user.password);
      // this.userDetailesForm.controls["firstName"].setValue(this.User.user.firstName);
      // this.userDetailesForm.controls["lastName"].setValue(this.User.user.lastName);
      // this.userDetailesForm.controls["telephoneNumber1"].setValue(this.User.user.telephoneNumber1);
      // this.userDetailesForm.controls["telephoneNumber2"].setValue(this.User.user.cellphone);
      // this.userDetailesForm.controls["email"].setValue(this.User.user.email);
      // this.userDetailesForm.controls["address"].setValue(this.Depositor.user.address);
      // this.userDetailesForm.controls["apartmentNumber"].setValue(this.Depositor.user.apartmentNumber);
  