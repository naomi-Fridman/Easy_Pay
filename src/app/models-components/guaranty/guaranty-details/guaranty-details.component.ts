import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Guaranty } from 'src/app/models/Guaranty';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-guaranty-details',
  templateUrl: './guaranty-details.component.html',
  styleUrls: ['./guaranty-details.component.css']
})
export class GuarantyDetailsComponent implements OnInit {

  constructor(private userService:UsersService) {}

  // @Output()
  // onsaveGuarantyForm:EventEmitter<Guaranty>=new EventEmitter<Guaranty>();
  checkUserForGuaranty(event){
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.GuarantyDetailsForm.controls["firstName"].setValue(user.firstName);
        this.GuarantyDetailsForm.controls["lastName"].setValue(user.lastName);
        this.GuarantyDetailsForm.controls["telephoneNumber1"].setValue(user.telephoneNumber1);
        this.GuarantyDetailsForm.controls["telephoneNumber2"].setValue(user.telephoneNumber2);
        this.GuarantyDetailsForm.controls["email"].setValue(user.email);
        this.GuarantyDetailsForm.controls["address"].setValue(user.address);
        this.GuarantyDetailsForm.controls["city"].setValue(user.city);
        this.GuarantyDetailsForm.controls["comments"].setValue(user.comments);
      }
    })
  }
  GuarantyDetailsForm :FormGroup =new FormGroup({
    firstName:new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(),
    city: new FormControl(""),
    address: new FormControl(""),
    telephoneNumber1: new FormControl(),
    telephoneNumber2: new FormControl(),
    identityNumber: new FormControl(null),
  })
  
  ngOnInit() {
  }

}
