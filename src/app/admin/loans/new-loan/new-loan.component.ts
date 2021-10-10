import { QueryList } from "@angular/core";
import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren } from "@angular/core";
import { FormGroup, FormControl, EmailValidator, Validators, FormBuilder } from '@angular/forms';
import { LoansService } from 'src/app/services/loans.service';
import { Router } from '@angular/router';
import { Guaranty } from 'src/app/models/Guaranty';
import { LoanDetailes } from 'src/app/models/LoanDetailes';
import { DirectDebit } from 'src/app/models/directDebit';
import { GuarantyDetailsComponent } from 'src/app/models-components/guaranty/guaranty-details/guaranty-details.component';
import { UsersService } from 'src/app/services/users.service';
import { CustomvalidationService } from "src/app/services/customvalidation.service";

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit, AfterViewInit {

  newLoanDetailes: LoanDetailes = new LoanDetailes();
  loanCurrency: number = 3;
  returnCurrency: number = 1
  uploadedFiles: any[] = [];
  selectedFile: File;
  imageSrc: string;
  saveGuarantyEvent: boolean = false;
  shtarFD = new FormData();
  submitted = false;
  private shtarUploaded: boolean = false;
  registerForm: FormGroup;

  l: DirectDebit = new DirectDebit();
  @ViewChildren(GuarantyDetailsComponent) guarantyDetailsComponent: QueryList<GuarantyDetailsComponent>;
  isExistUser: boolean = false;

  constructor(
    private userService: UsersService,
    private loansService: LoansService,
    private cd: ChangeDetectorRef,
    private route: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) { }

  ngAfterViewInit() {
    this.guarantyDetailsComponent.forEach(g => console.log(g));
    //this.newLoanDetailes.guaranty.push(this.guarantyDetailsComponent.first.GuarantyDetailsForm.value) //<= This will set data
    this.cd.detectChanges();
  }
  saveGuaranty(g: Guaranty) {
    alert(g);
  }
  checkUserForLoan(event) {
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.isExistUser = true;
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
    debugger
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    uploadData.append('newLoaner', JSON.stringify(this.newLoanDetailes));
    //check if exists
    this.loansService.postLoan(uploadData).subscribe(e => {
      this.route.navigate(["/homePage"]);
    });
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
    if (this.selectedFile) {
      this.shtarFD.append("shter", this.selectedFile);
    }
  }

  loanerDetailesUserForm : FormGroup
  // = new FormGroup({
  //   firstName: new FormControl(""),
  //   lastName: new FormControl(""),
  //   email: new FormControl(""),
  //   city: new FormControl(""),
  //   address: new FormControl(""),
  //   identityNumber: new FormControl(null),
  //   password: new FormControl(""),
  //   userName: new FormControl("", Validators.required,),
  //   telephoneNumber1: new FormControl(""),
  //   telephoneNumber2: new FormControl(""),
  //   idUser: new FormControl(null),
  // });
  

  loanerDetailesLoanForm: FormGroup
  //  = new FormGroup({
  //   userId: new FormControl(),
  //   id: new FormControl(),
  //   sum: new FormControl(),
  //   loanDate: new FormControl(),
  //   hebrewLoanDate: new FormControl(),
  //   repaymentDate: new FormControl(),
  //   repaymentManner: new FormControl(),
  //   hebrewRepaymentDate: new FormControl(),
  //   paymentsNumber: new FormControl(),
  //   currencyId: new FormControl(),
  //   // currencyIdReturn: new FormControl(),
  //   creditCardId: new FormControl(),
  //   paidUp: new FormControl(),
  //   directDebitId: new FormControl(),
  //   monthlyPaymentSum: new FormControl(),
  //   monthlyPaymentDay: new FormControl(),
  //   repaymentFirstDate: new FormControl(),
  //   guaranty: new FormControl(),
  //   guarantyId2: new FormControl(),
  //   guarantyId3: new FormControl(),
  //   guarantyId4: new FormControl(),
  //   guarantyId5: new FormControl()
  // });

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

get userForm(){
  return this.loanerDetailesUserForm.controls;
}
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
    else {
      alert('invaled');
    }
  }

  

  ngOnInit() {

    this.loanerDetailesUserForm= this.fb.group({
      firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    address: new FormControl(""),
    identityNumber: new FormControl(null),
    password: new FormControl(""),
    userName: new FormControl("", Validators.required,),
    telephoneNumber1: new FormControl(""),
    telephoneNumber2: new FormControl(""),
    idUser: new FormControl(null),
    })

    this.loanerDetailesLoanForm=this.fb.group({
         userId: new FormControl(""),
        id: new FormControl(""),
        sum: new FormControl(""),
        loanDate: new FormControl(''),
        hebrewLoanDate: new FormControl(''),
        repaymentDate: new FormControl(""),
        repaymentManner: new FormControl(''),
        hebrewRepaymentDate: new FormControl(''),
        paymentsNumber: new FormControl(''),
        currencyId: new FormControl(''),
        // currencyIdReturn: new FormControl(),
        creditCardId: new FormControl(''),
        paidUp: new FormControl(''),
        directDebitId: new FormControl(''),
        monthlyPaymentSum: new FormControl(''),
        monthlyPaymentDay: new FormControl(''),
        repaymentFirstDate: new FormControl(''),
        guaranty: new FormControl(''),
        guarantyId2: new FormControl(''),
        guarantyId3: new FormControl(''),
        guarantyId4: new FormControl(''),
        guarantyId5: new FormControl('')
    })
    // this.loanerDetailesUserForm.get('requestdate').patchValue(this.formatDate(new Date()));
   




    // this.registerForm = this.fb.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
    //   password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    //   confirmPassword: ['', [Validators.required]],
    // },
    //   {
    //     validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    //   }
    // );



  }

}
