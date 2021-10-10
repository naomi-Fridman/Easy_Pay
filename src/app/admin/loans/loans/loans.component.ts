import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { Loan } from 'src/app/models/Loan';
import { AdminService } from '../../../services/admin.service';
import { Payment } from 'src/app/models/Payment';
import { Router } from '@angular/router';
import { Loaner } from 'src/app/models/Loaner';
import { LoansService } from '../../../services/loans.service';
import { GuarantyUser } from 'src/app/models/GuarantyUser';
import { UsersService } from '../../../services/users.service';
import { DTO_loans } from 'src/app/models/DTO_loans';
import { DTO_userParms } from 'src/app/models/DTO_userParms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loansList: Loan[];
  userList: User[];
  paymentList: Payment[];
  loanerToDisplay: Loaner[];
  display: boolean = false;
  loaner: Loaner;
  guarantiesId: number[] = new Array();
  guarantyList: GuarantyUser[];
  guaranty: GuarantyUser = new GuarantyUser();
  selectedPayment:Payment;
  dto_loans: DTO_loans= new DTO_loans();
  dtoUsersPrms:DTO_userParms=new DTO_userParms();
  selectedSum: string;

  onChange(newValue: string) {
    if (newValue == "from") {
      this.dto_loans.sumExact = null;
      this.dto_loans.sumTill = null;
    }
    else if (newValue == "till") {
      this.dto_loans.sumFrom = null;
      this.dto_loans.sumExact = null;
    }
    else if (newValue = "exact") {
      this.dto_loans.sumFrom = null;
      this.dto_loans.sumTill = null;
    }
    else {
      this.dto_loans.sumExact = null;
    }
  }
  editDetails(loaner: Loaner) {
    this.router.navigate(['/loanerDetails', JSON.stringify(loaner.loaner.id)]);
  }
  
  showDetails(_loaner: Loaner,content) {
    debugger
    // this.loanerDetailesForm.controls["sum"].setValue(_loaner.loaner.sum);
    // this.loanerDetailesForm.controls["loanDate"].setValue(_loaner.loaner.loanDate);
    // this.loanerDetailesForm.controls["hebrewLoanDate"].setValue(_loaner.loaner.hebrewLoanDate);
    // this.loanerDetailesForm.controls["repaymentDate"].setValue(_loaner.loaner.repaymentDate);
    // this.loanerDetailesForm.controls["hebrewRepaymentDate"].setValue(_loaner.loaner.hebrewRepaymentDate);
    // this.loanerDetailesForm.controls["paymentsNumber"].setValue(_loaner.loaner.paymentsNumber);
    // this.loanerDetailesForm.controls["paidUp"].setValue(_loaner.loaner.paidUp);
    this.loaner = _loaner;
    this.display = true;
    // //this.modalService.open(longContent, { scrollable: true });

    //  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //  });
  }
  getPaymentsForLoan(userId: number) {
    this.loanService.getPaymentIdByTypeName("פרעון").subscribe(data =>
      this.loanService.getPaymentForLoan(userId, data).subscribe(
         p =>
        this.loaner.payments = p
      )
    )
  }
  getGuarantiesForLoan() {
    var i = 0;
    if (this.guarantyList == undefined) {
      this.guarantiesId.push(this.loaner.loaner.guarantyId1);
      this.guarantiesId.push(this.loaner.loaner.guarantyId2);
      this.guarantiesId.push(this.loaner.loaner.guarantyId3);
      this.guarantiesId.push(this.loaner.loaner.guarantyId4);
      this.guarantiesId.push(this.loaner.loaner.guarantyId5);
      this.guarantyList = new Array();
      this.loanService.getGuarantiesForLoan(this.guarantiesId).subscribe(data =>
        data.forEach(d => {
          this.userList.forEach(u => {
            if (u.id == d.userId) {
              this.guarantyList[i] = new GuarantyUser();
              this.guarantyList[i].guaranty = d;
              this.guarantyList[i].user = u;
              i += 1;
            }
          })
        }))
      this.loaner.guaranty = this.guarantyList;
    }
    //document.getElementById("guarantysCo").innerHTML = ""; 
  }
  getAllPayments() {
    this.loanService.getAllLoans(this.dto_loans).subscribe(data => {
      this.loansList = data;
      var i = 0;
      this.loanerToDisplay = []
      if (this.loansList.length == 0) {
        this.loanerToDisplay = []
      }
      this.loansList.forEach(loan => {
        this.userList.forEach(user => {
          if (loan.userId == user.id) {
            this.loanerToDisplay[i] = new Loaner();
            this.loanerToDisplay[i].loaner = loan;
            this.loanerToDisplay[i].user = user;
            i += 1;
          }
        })
      }) 
    });
  }


  closeResult = '';


  constructor( private router: Router, private loanService: LoansService,private userService: UsersService) {
    this.loanerToDisplay = new Array();
    this.loanService.getAllLoans(this.dto_loans).subscribe(data => {
      this.loansList = data;
      console.log(this.loansList);
      this.userService.getAllUsers(this.dtoUsersPrms).subscribe(data => {
        this.userList = data;
        console.log(this.userList);
        // this.adminService.getAllPayments().subscribe(data=>{
        //   this.paymentList=data; 
        //   console.log(this.paymentList) ;
        var i = 0;
        this.loansList.forEach(loan => {
          this.userList.forEach(user => {
            if (user.id == loan.userId) {
              this.loanerToDisplay[i] = new Loaner()
              this.loanerToDisplay[i].user = user;
              this.loanerToDisplay[i].loaner = loan;
              i+=1;
              // this.loanerToDisplay[i].payments=[];
              // this.loanService.getPaymentForLoan(user.id,"פרעון").subscribe(data=>
              //   this.loanerToDisplay[i].payments=data)
              // this.loanerToDisplay[i].payments=
              // this.paymentList.filter(x => x.userId == loan.userId);    
            }
          });
        });
        // },err=>{
        //   this.paymentList=[];
        // });
      }, err => {
        this.userList = [];
      });
    }, err => {
      this.loansList = [];
    });
    console.log(this.loanerToDisplay)
  }

  ngOnInit() {
  }
  loanerDetailesForm: FormGroup = new FormGroup({
    // password:new FormControl(""),
    // userName:new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    telephoneNumber1: new FormControl(),
    telephoneNumber2: new FormControl(),
    email: new FormControl(""),
    // address:new FormControl(),
    // city :new FormControl(),
    // comments:new FormControl(),
    // identityNumber:new FormControl(),
    currency: new FormControl(),
    sum: new FormControl(),
    loanDate: new FormControl(),
    hebrewLoanDate: new FormControl(),
    repaymentDate: new FormControl(""),
    hebrewRepaymentDate: new FormControl(""),
    repaymentManner: new FormControl(),
    // firstPaymentDate:new FormControl(),
    paymentsNumber: new FormControl(),
    // accountNumber:new FormControl(),
    // dayInMonth:new FormControl(),
    paidUp: new FormControl(),
  });

}
