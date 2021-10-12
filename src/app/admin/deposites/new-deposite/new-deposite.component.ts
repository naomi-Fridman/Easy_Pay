import { Route } from '@angular/compiler/src/core';
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
  isExistUser:boolean=false;
  constructor(private route:Router, private depositeService: DepositesService, private userService :UsersService) { }
  checkUserForDeposite(event) {
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.isExistUser=true;
        this.DepositorDetailesUserForm.controls["id"].setValue(user.id);
        this.DepositorDetailesUserForm.controls["firstName"].setValue(user.firstName);
        this.DepositorDetailesUserForm.controls["lastName"].setValue(user.lastName);
        this.DepositorDetailesUserForm.controls["telephoneNumber1"].setValue(user.telephoneNumber1);
        this.DepositorDetailesUserForm.controls["telephoneNumber2"].setValue(user.telephoneNumber2);
        this.DepositorDetailesUserForm.controls["email"].setValue(user.email);
        this.DepositorDetailesUserForm.controls["address"].setValue(user.address);
        this.DepositorDetailesUserForm.controls["city"].setValue(user.city);
        this.DepositorDetailesUserForm.controls["comments"].setValue(user.comments);
      }
    })
  }
  save() {
    if(this.isExistUser==true)
    {
      this.userService.updateUser(this.DepositorDetailesUserForm.value).subscribe(data=>{
        this.DepositorDetailesDepositeForm.controls["userId"].setValue(data.id)
        if(this.DepositorDetailesDepositeForm.controls["currencyId"].value=="3")
        this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
        else if(this.DepositorDetailesDepositeForm.controls["currencyId"].value=="1") 
        this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
        this.depositeService.postDeposite(this.DepositorDetailesDepositeForm.value).subscribe(e=>{
          this.route.navigate(["/homePage"]);
        });
      })
    }
    else{
      this.userService.postUser(this.DepositorDetailesUserForm.value).subscribe(data=>{
        this.DepositorDetailesDepositeForm.controls["userId"].setValue(data)
        if(this.DepositorDetailesDepositeForm.controls["currencyId"].value=="3")
        this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
        else if(this.DepositorDetailesDepositeForm.controls["currencyId"].value=="1") 
        this.DepositorDetailesDepositeForm.controls["currencyId"].setValue(JSON.parse(this.DepositorDetailesDepositeForm.controls["currencyId"].value))
        this.depositeService.postDeposite(this.DepositorDetailesDepositeForm.value).subscribe(e=>{
          this.route.navigate(["/homePage"]);
        });
      })
    }
    
      
      //his.router.navigate(["/adminl"]);
    //}
  }

  ngOnInit() {
  }

  get DepositorUserFormControl() { return this.DepositorDetailesUserForm.controls; }
  get DepositorDepositeFormControl() { return this.DepositorDetailesDepositeForm.controls; }


  DepositorDetailesUserForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    password: new FormControl(""),
    userName: new FormControl(""),
    firstName: new FormControl("",{validators:[Validators.required],updateOn: 'blur'}),
    lastName: new FormControl("" ,{validators:[Validators.required],updateOn: 'blur'}),
    address: new FormControl("",{validators:[Validators.required],updateOn: 'blur'}),
    city: new FormControl(""),
    telephoneNumber1: new FormControl(),
    telephoneNumber2: new FormControl("",{validators:[Validators.required],updateOn: 'blur'}),
    email: new FormControl("" ,{validators:[Validators.email],updateOn: 'blur'}),
    comments: new FormControl(""),
    identityNumber: new FormControl(0),   
  });

  DepositorDetailesDepositeForm: FormGroup = new FormGroup({
    
    id: new FormControl(0),
    sum: new FormControl(0,{validators:[Validators.required],updateOn: 'blur'}),
    currencyId: new FormControl(0,{validators:[Validators.required],updateOn: 'blur'}),
    returnDate: new FormControl(""),
    comments : new FormControl(""),
    status: new FormControl(true),
    hebrewDepositeDate: new FormControl(""),
    hebrewDepositeReturnDate: new FormControl(""),
    // directDebitId: new FormControl(0),
    paymentsNumber : new FormControl(0),
    // creditCardId: new FormControl(0),
    userId: new FormControl(0),
    depositeDate: new FormControl("",{validators:[Validators.required],updateOn: 'blur'}),
    // currencyIdReturn: new FormControl(),
  });
}
