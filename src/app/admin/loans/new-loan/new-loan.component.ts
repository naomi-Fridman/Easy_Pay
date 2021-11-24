import { QueryList } from "@angular/core";
import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren } from "@angular/core";
// import bootstrap from 'bootstrap' 
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
export class NewLoanComponent implements OnInit {
  newLoanDetailes: LoanDetailes = new LoanDetailes();
  loanCurrency: number = 3;
  returnCurrency: number = 1
  uploadedFiles: any[] = [];
  selectedFile: File;
  imageSrc: string;
  saveGuarantyEvent: boolean = false;
  shtarFD = new FormData();
  private shtarUploaded: boolean = false;
  formSubmitAttempt: boolean = false;
  fileName: string = "";
  l: DirectDebit = new DirectDebit();
  @ViewChildren(GuarantyDetailsComponent) guarantyDetailsComponent: QueryList<GuarantyDetailsComponent>;
  isExistUser: boolean = false;
  displayStyle = "none";


  openPopup() {
    this.displayStyle = "block";
    
  }
  closePopup() {
    this.displayStyle = "none";
    this.err = false;
    this.formErr = false;
  }

  constructor(private userService: UsersService, private loansService: LoansService, private cd: ChangeDetectorRef, private route: Router) { }  //private messageService: MessageService


  // saveGuaranty(g: Guaranty) {
  //   alert(g);
  // }
  checkUserForLoan(event) {
    this.userService.getUserByIdentityNumber(event.target.value).subscribe(user => {
      if (user) {
        this.isExistUser = true;
        this.loanerDetailesUserForm.controls["firstName"].setValue(user.firstName);
        this.loanerDetailesUserForm.controls["lastName"].setValue(user.lastName);
        this.loanerDetailesUserForm.controls["telephoneNumber"].setValue(user.telephoneNumber);
        this.loanerDetailesUserForm.controls["cellphoneNumber"].setValue(user.cellphoneNumber);
        this.loanerDetailesUserForm.controls["email"].setValue(user.email);
        this.loanerDetailesUserForm.controls["address"].setValue(user.address);
        this.loanerDetailesUserForm.controls["comments"].setValue(user.comments);
      }
    })
  }
  err: boolean = false;
  formErr: boolean = false;
  save() {

    let i: number = 0;
    this.formSubmitAttempt = true;
    this.guarantyDetailsComponent.forEach(g => {
      if (i < 2) {
        i++;
        g.GuarantyDetailsForm.valid ?
          this.newLoanDetailes.guaranty.push(g.GuarantyDetailsForm.value) : this.err = true;
      }
      else {
        this.newLoanDetailes.guaranty.push(g.GuarantyDetailsForm.value)
      }
    })
    if (this.err) {
      this.openPopup();
    }
    if (this.loanerDetailesLoanForm.valid && this.loanerDetailesUserForm.valid && !this.err) {

      this.newLoanDetailes.loaner = this.loanerDetailesLoanForm.value;
      this.newLoanDetailes.directDebit = this.loanerDetailesDDForm.value;
      this.newLoanDetailes.user = this.loanerDetailesUserForm.value;
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile);
      uploadData.append('newLoaner', JSON.stringify(this.newLoanDetailes));
      //check if exists
      this.loansService.postLoan(uploadData).subscribe(e => {
        this.displayStyle = "block";

      });
    }
    else {
      this.formErr = true
    }
  }




  id(event) {
    event.target.value;
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  get loanerDetailesUserFormControl() { return this.loanerDetailesUserForm.controls; }
  get loanerDetailesLoanFormControl() { return this.loanerDetailesLoanForm.controls; }


  loanerDetailesUserForm: FormGroup = new FormGroup({
    firstName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    email: new FormControl("", { validators: [Validators.email], updateOn: 'blur' }),
    address: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    identityNumber: new FormControl("", { validators: ([Validators.required, Validators.minLength(9), Validators.maxLength(9)]), updateOn: 'blur' }),
    telephoneNumber: new FormControl("", { validators: [Validators.minLength(7), Validators.maxLength(10)], updateOn: 'blur' }),
    cellphoneNumber: new FormControl("", { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)], updateOn: 'blur' }),
    userId: new FormControl(null),
    loanId: new FormControl(null),
    depositId: new FormControl(null),
  });


  loanerDetailesLoanForm: FormGroup = new FormGroup({

    id: new FormControl(0),
    userId: new FormControl(),
    sum: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    currencyId: new FormControl(3, { validators: [Validators.required], updateOn: 'blur' }),
    date: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    hebrewDate: new FormControl(""),
    repaymentDate: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    repaymentManner: new FormControl(0),
    hebrewRepaymentDate: new FormControl(""),
    directDebitId: new FormControl(null),
    paymentsNumber: new FormControl(1),
    paidUp: new FormControl(false),
    guarantyId1: new FormControl(0),
    guarantyId2: new FormControl(0),
    guarantyId3: new FormControl(0),
    guarantyId4: new FormControl(0),
    guarantyId5: new FormControl(0),
    creditCardId: new FormControl(null),
    monthlyPaymentSum: new FormControl(0),
    monthlyPaymentDay: new FormControl(1),
    repaymentFirstDate: new FormControl(null),
    shtar: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    paymentsIndex: new FormControl(0),

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
