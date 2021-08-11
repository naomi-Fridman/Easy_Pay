import { QueryList } from "@angular/core";
import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren } from "@angular/core";

import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import { Loaner } from 'src/app/models/Loaner';
import { MessageService } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/Loan';
import { User } from 'src/app/models/User';
import { Guaranty } from 'src/app/models/Guaranty';
import { LoanDetailes } from 'src/app/models/LoanDetailes';
import { DirectDebit } from 'src/app/models/directDebit';
import { GuarantyDetailsComponent } from 'src/app/models-components/guaranty/guaranty-details/guaranty-details.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit ,AfterViewInit{
  newLoanDetailes: LoanDetailes = new LoanDetailes();
  loanCurrency: number=3;
  returnCurrency:number=1
  uploadedFiles: any[] = [];
  selectedFile: any;
  imageSrc: string;
  saveGuarantyEvent: boolean = false;

  l: DirectDebit = new DirectDebit();
  @ViewChildren(GuarantyDetailsComponent) guarantyDetailsComponent: QueryList<GuarantyDetailsComponent>;
  isExistUser: boolean=false;


  constructor(private userService: UsersService,private loansService: LoansService, private cd: ChangeDetectorRef, private route :Router) {}  //private messageService: MessageService

  ngAfterViewInit() {
    this.guarantyDetailsComponent.forEach(g => console.log(g));
    //console.log(this.guarantyDetailsComponent);
    //this.newLoanDetailes.guaranty.push(this.guarantyDetailsComponent.first.GuarantyDetailsForm.value) //<= This will set data
    this.cd.detectChanges();
  }
  saveGuaranty(g: Guaranty) {
    alert(g);
  }
  checkUserForLoan(event) {
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.isExistUser=true;
        this.loanerDetailesUserForm.controls["firstName"].setValue(user.firstName);
        this.loanerDetailesUserForm.controls["lastName"].setValue(user.lastName);
        this.loanerDetailesUserForm.controls["telephoneNumber1"].setValue(user.telephoneNumber1);
        this.loanerDetailesUserForm.controls["telephoneNumber2"].setValue(user.telephoneNumber2);
        this.loanerDetailesUserForm.controls["email"].setValue(user.email);
        this.loanerDetailesUserForm.controls["address"].setValue(user.address);
        this.loanerDetailesUserForm.controls["city"].setValue(user.city);
        this.loanerDetailesUserForm.controls["comments"].setValue(user.comments);
      }
    })
  }
  // onChangeCurrencyLoan(value){
  //   this.loanCurrency=value;
  // }
  // onChangeCurrencyReturn(value){
  //   this.returnCurrency=value;
  // }
  save() {
    this.guarantyDetailsComponent.forEach(g =>
      this.newLoanDetailes.guaranty.push(g.GuarantyDetailsForm.value));
    this.newLoanDetailes.loaner = this.loanerDetailesLoanForm.value;
    this.newLoanDetailes.directDebit = this.loanerDetailesDDForm.value;
    this.newLoanDetailes.user = this.loanerDetailesUserForm.value;
    
    const uploadData = new FormData();
    // if (this.selectedFile == null) {
    //   //alert("please attach the shtar scan");
    // }
    // else {
      uploadData.append('file', this.selectedFile);
      uploadData.append('newLoaner', JSON.stringify(this.newLoanDetailes));
      //check if exists
      this.loansService.postLoan(uploadData).subscribe(e=>{
        this.route.navigate(["/homePage"]);
      });
      //his.router.navigate(["/adminl"]);
    //}
  }
  id(event) {
    event.target.value;
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.loanerDetailesLoanForm.patchValue({
          fileResources: reader.result
        });
      }
    }
  }
  loanerDetailesUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("" ),
    email: new FormControl(),
    city: new FormControl(""),
    address: new FormControl(""),
    identityNumber: new FormControl(null),
    password: new FormControl(""),
    userName: new FormControl(""),
    telephoneNumber1: new FormControl(),
    telephoneNumber2: new FormControl( ),
    idUser: new FormControl(null),
  });

  loanerDetailesLoanForm: FormGroup = new FormGroup({
    userId: new FormControl(),
    id: new FormControl(),
    sum: new FormControl(),
    loanDate: new FormControl(),
    hebrewLoanDate: new FormControl(),
    repaymentDate: new FormControl(),
    repaymentManner: new FormControl(),
    hebrewRepaymentDate: new FormControl(),
    paymentsNumber: new FormControl(),
    currencyId: new FormControl(),
    // currencyIdReturn: new FormControl(),
    creditCardId: new FormControl(),
    paidUp: new FormControl(),
    directDebitId: new FormControl(),
    monthlyPaymentSum: new FormControl(),
    monthlyPaymentDay: new FormControl(),
    repaymentFirstDate: new FormControl(),
    guaranty: new FormControl(),
    guarantyId2: new FormControl(),
    guarantyId3: new FormControl(),
    guarantyId4: new FormControl(),
    guarantyId5: new FormControl()
  });

  loanerDetailesDDForm: FormGroup = new FormGroup({
    idDD: new FormControl(),
    active: new FormControl(),
    collectionDay: new FormControl(),
    comments: new FormControl(),
    currencyIdD: new FormControl(),
    directDebitSum: new FormControl(),
    finishDate: new FormControl(),
    numberAccount: new FormControl(),
    numberBranchId: new FormControl(),
    startDate: new FormControl(),
    target: new FormControl(),
    totalSum: new FormControl(),
    userId: new FormControl(),
    bankId: new FormControl(0)

  });
  ngOnInit() {
  }

}
