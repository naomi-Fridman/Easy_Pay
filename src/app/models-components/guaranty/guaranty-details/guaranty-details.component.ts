import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Guaranty } from 'src/app/models/Guaranty';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-guaranty-details',
  templateUrl: './guaranty-details.component.html',
  // styleUrls: ['../new-loan.component.css']
  styleUrls: ['./guaranty-details.component.css']
})
export class GuarantyDetailsComponent implements OnInit {

  constructor(private userService:UsersService) {}

  checkUserForGuaranty(event){
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.GuarantyDetailsForm.controls["firstName"].setValue(user.firstName);
        this.GuarantyDetailsForm.controls["lastName"].setValue(user.lastName);
        this.GuarantyDetailsForm.controls["telephoneNumber1"].setValue(user.telephoneNumber);
        this.GuarantyDetailsForm.controls["telephoneNumber2"].setValue(user.cellphoneNumber);
        this.GuarantyDetailsForm.controls["email"].setValue(user.email);
        this.GuarantyDetailsForm.controls["address"].setValue(user.address);
        this.GuarantyDetailsForm.controls["comments"].setValue(user.comments);
      }
    })
  }
  get guarantyDetailsFormControl() { return this.GuarantyDetailsForm.controls; }


  GuarantyDetailsForm :FormGroup =new FormGroup({
    firstName:new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    email: new FormControl("", { validators: [Validators.email], updateOn: 'blur' }),
    city: new FormControl(""),
    address: new FormControl(""),
    telephoneNumber: new FormControl(),
    cellphoneNumber: new FormControl(),
    identityNumber: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
  })
  
  ngOnInit() {
  }

}
