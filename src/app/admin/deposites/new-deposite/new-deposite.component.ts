import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Depositor } from 'src/app/models/Depositor';
import { DepositesService } from 'src/app/services/deposites.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-deposite',
  templateUrl: './new-deposite.component.html',
  styleUrls: ['./new-deposite.component.css']
})
export class NewDepositeComponent implements OnInit {
  newDepositeDetailes: Depositor = new Depositor();
  isExistUser: boolean = false;
  formSubmitAttempt: boolean = false;
  success: boolean =false;
  massege:string="ההפקדה נשמרה בהצלחה!!"
  constructor(private route: Router, private depositeService: DepositesService, private userService: UsersService) { }
  close(){
    this.success=false;
  }
  checkUserForDeposite(event) {
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.isExistUser = true;
        this.DepositorDetailesUserForm.controls["id"].setValue(user.id);
        this.DepositorDetailesUserForm.controls["firstName"].setValue(user.firstName);
        this.DepositorDetailesUserForm.controls["lastName"].setValue(user.lastName);
        this.DepositorDetailesUserForm.controls["cellphoneNumber"].setValue(user.cellphoneNumber);
        this.DepositorDetailesUserForm.controls["telephoneNumber"].setValue(user.telephoneNumber);
        this.DepositorDetailesUserForm.controls["email"].setValue(user.email);
        this.DepositorDetailesUserForm.controls["address"].setValue(user.address);
        this.DepositorDetailesUserForm.controls["comments"].setValue(user.comments);
      }
      else{
        this.isExistUser = false;
      }
    })
  }
  disableSave(){
    if(this.DepositorDetailesDepositeForm.status=='INVALID'  )return false;
    if( this.DepositorDetailesUserForm.status=='INVALID' ) return false
    return true;
  }
  save() {
    this.formSubmitAttempt = true;
      if (this.isExistUser == true) {
        this.userService.updateUser(this.DepositorDetailesUserForm.value).subscribe(data => {
          this.DepositorDetailesDepositeForm.controls["userId"].setValue(data.id)
          if (this.DepositorDetailesDepositeForm.controls["currencyId"].value == "3")
            this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
          else if (this.DepositorDetailesDepositeForm.controls["currencyId"].value == "1")
            this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
          this.depositeService.postDeposite(this.DepositorDetailesDepositeForm.value).subscribe(e => {
            this.success=true;
          });
        })
      }
      else {
        this.userService.postUser(this.DepositorDetailesUserForm.value).subscribe(data => {
          this.DepositorDetailesDepositeForm.controls["userId"].setValue(data)
          if (this.DepositorDetailesDepositeForm.controls["currencyId"].value == "3")
            this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
          else if (this.DepositorDetailesDepositeForm.controls["currencyId"].value == "1")
            this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
          this.depositeService.postDeposite(this.DepositorDetailesDepositeForm.value).subscribe(e => {
            this.success=true;
            // this.route.navigate(["/deposites"]);

            // this.route.navigate(["/homePage"]);
          });
        })
      }
  }

  ngOnInit() {
  }
  get DepositorUserFormControl() { return this.DepositorDetailesUserForm.controls; }
  get DepositorDepositeFormControl() { return this.DepositorDetailesDepositeForm.controls; }

  DepositorDetailesUserForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    address: new FormControl(""),
    cellphoneNumber: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    telephoneNumber: new FormControl(""),
    email: new FormControl("", { validators: [Validators.email], updateOn: 'blur' }),
    comments: new FormControl(""),
    identityNumber: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
  });
  DepositorDetailesDepositeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    sum: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    currencyId: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    returnDate: new FormControl(""),
    comments: new FormControl(""),
    status: new FormControl(true),
    hebrewDate: new FormControl(""),
    hebrewReturnDate: new FormControl(""),
    userId: new FormControl(null),
    date: new FormControl("", { validators: [Validators.required], updateOn: 'blur' })
  });
}