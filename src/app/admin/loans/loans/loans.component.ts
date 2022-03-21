import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { Loan } from 'src/app/models/Loan';
import { Payment } from 'src/app/models/Payment';
import { Router } from '@angular/router';
import { Loaner } from 'src/app/models/Loaner';
import { LoansService } from '../../../services/loans.service';
import { GuarantyUser } from 'src/app/models/GuarantyUser';
import { UsersService } from '../../../services/users.service';
import { DTO_loans } from 'src/app/models/DTO_loans';
import { DTO_searchParms } from 'src/app/models/DTO_searchParms';
import { PaymentsService } from 'src/app/services/payments.service';
import { LoanPaymantsStatus } from 'src/app/models/loanPaymantsStatus';
import { error } from 'protractor';
import { DTO_Payments } from 'src/app/models/DTO_Payments';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loansList: Loan[];
  userList: User[];
  dtoPayments: DTO_Payments = new DTO_Payments();
  paymentList: Payment[];
  loanerToDisplay: Loaner[];
  tmpLoaner: Loaner[];
  display: boolean = false;
  loaner: Loaner;
  guarantiesId: number[] = new Array();
  guarantyList: GuarantyUser[];
  guaranty: GuarantyUser = new GuarantyUser();
  selectedPayment: Payment;
  dto_loans: DTO_loans = new DTO_loans();
  dtoUsersPrms: DTO_searchParms = new DTO_searchParms();
  selectedSum: string;
  typId: number;
  displayStyle: string;
  singleLone: Loaner;
  modalMsg: string = " האם אתה בטוח שברצונך למחוק את הלוואה זו לצמיתות?"
  delete: boolean = true;

  openPopup(loan: Loaner) {
    this.singleLone = loan;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.modalMsg = " האם אתה בטוח שברצונך למחוק את הלוואה זו לצמיתות?"
    this.delete = true;
  }

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
  deleteLoan() {
    if (this.delete == true) {
      let loanIndex = this.loanerToDisplay.findIndex(d => d.loaner.id = this.singleLone.loaner.id)
      this.loanService.deleteLoan(this.singleLone.loaner.id).subscribe(l => {
        
        this.loanerToDisplay.splice(loanIndex, 1);
        this.delete = false;
        this.modalMsg = "ההלוואה נמחקה בהצלחה"
        this.openPopup(this.singleLone);
      },(e=>{
        this.modalMsg="הפעולה נכשלה. נסה שנית.";
        this.openPopup(this.singleLone)
      }))
    }
    else {
      this.closePopup();
    }
  }
  editDetails(loaner: Loaner) {
    this.router.navigate(['/editLoanDetails', { "loaner": JSON.stringify(loaner) }]);
  }
  showDetails(_loaner: Loaner) {
    this.loaner = _loaner;
    this.display = true;
  }
  getPaymentsForLoan(userId: number) {
    var payments = [];
    var i = 0;
    this.loanService.getPaymentIdByTypeName("פרעון").subscribe(data =>
      this.paymentService.getPaymentForLoan(userId, data).subscribe(p => {
        this.loaner.payments = p;
        payments[i++] = p;
      }),
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
  }
  culcLoanPadeUp(loaner: Loaner) {
    loaner.payments.forEach(p => {
      if (p.date > loaner.loaner.date) {
        loaner.loanPaymantsStatus.sumPadeUp += p.sum;
      }
    }
    );
    loaner.loanPaymantsStatus.sumLeft = loaner.loaner.sum - loaner.loanPaymantsStatus.sumPadeUp;
    loaner.loanPaymantsStatus.numberOfPaymentsThatWerePayed = loaner.loanPaymantsStatus.sumPadeUp / loaner.loaner.monthlyPaymentSum;
    loaner.loanPaymantsStatus.numberOfPaymentsThatWerentPayed = loaner.loaner.paymentsNumber - loaner.loanPaymantsStatus.numberOfPaymentsThatWerePayed;
    loaner.loanPaymantsStatus.rest = loaner.loanPaymantsStatus.sumPadeUp % loaner.loaner.monthlyPaymentSum;
    return loaner.loanPaymantsStatus;
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
  search(){
    this.loanerToDisplay=this.tmpLoaner;
    if(this.dtoUsersPrms.identityNumber!=undefined && this.dtoUsersPrms.identityNumber!="")
    this.loanerToDisplay=this.loanerToDisplay.filter(item => item.user.identityNumber.indexOf(this.dtoUsersPrms.identityNumber) !== -1);
    if(this.dtoUsersPrms.firstName!=undefined && this.dtoUsersPrms.firstName!="")
    this.loanerToDisplay=this.loanerToDisplay.filter(item => item.user.firstName.indexOf(this.dtoUsersPrms.firstName) !== -1);
    if(this.dtoUsersPrms.lastName!=undefined && this.dtoUsersPrms.lastName!="")
    this.loanerToDisplay=this.loanerToDisplay.filter(item => item.user.lastName.indexOf(this.dtoUsersPrms.lastName) !== -1);
    if(this.dtoUsersPrms.address!=undefined && this.dtoUsersPrms.address!="")
    this.loanerToDisplay=this.loanerToDisplay.filter(item => item.user.address.indexOf(this.dtoUsersPrms.address) !== -1);
    if(this.dtoUsersPrms.sum!=undefined && this.dtoUsersPrms.sum!=null)
    this.loanerToDisplay=this.loanerToDisplay.filter(item => item.loaner.sum== this.dtoUsersPrms.sum );
  }
  constructor(private router: Router, private loanService: LoansService, private userService: UsersService, private paymentService: PaymentsService) {
    this.loanerToDisplay = new Array();
    this.paymentService.getAllPayments(this.dtoPayments).subscribe(data => {
      this.paymentList = data;
      this.loanService.getPaymentIdByTypeName("פרעון").subscribe(typeId => this.typId = typeId);
      this.loanService.getAllLoans(this.dto_loans).subscribe(data => {
        this.loansList = data;
        this.userService.getAllUsers(this.dtoUsersPrms).subscribe(data => {
          this.userList = data;
          var i = 0, j = 0;
          this.loansList.forEach(loan => {
            this.userList.forEach(user => {
              if (user.id == loan.userId) {
                this.loanerToDisplay[i] = new Loaner()
                this.loanerToDisplay[i].user = user;
                this.loanerToDisplay[i].loaner = loan;

              }
            });
            this.paymentList.forEach(p => {
              if (p.loanId == loan.id) {
                this.loanerToDisplay[i].payments = [];
                this.loanerToDisplay[i].payments[j] = new Payment();
                this.loanerToDisplay[i].payments[j++] = p;
              }
            });

            if (loan.paidUp == false) {
              if (this.loanerToDisplay[i].payments != [] && this.loanerToDisplay[i].payments != null) {
                this.loanerToDisplay[i].loanPaymantsStatus = new LoanPaymantsStatus();
                this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp = 0;
                this.loanerToDisplay[i].payments.forEach(p => {
                  if (p.date > this.loanerToDisplay[i].loaner.date) {
                    if (this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp == null) {
                      this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp += p.sum;
                    }
                    else {
                      this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp += p.sum;
                    }
                  }
                }
                );
                if (this.loanerToDisplay[i].loanPaymantsStatus == null || this.loanerToDisplay[i].loanPaymantsStatus == undefined) {
                  this.loanerToDisplay[i].loanPaymantsStatus = new LoanPaymantsStatus();
                  this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp = 0;
                }
                this.loanerToDisplay[i].loanPaymantsStatus.sumLeft = this.loanerToDisplay[i].loaner.sum - this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp;
                this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerePayed = this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp / this.loanerToDisplay[i].loaner.monthlyPaymentSum;
                this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerentPayed = this.loanerToDisplay[i].loaner.paymentsNumber - this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerePayed;
                this.loanerToDisplay[i].loanPaymantsStatus.rest = this.loanerToDisplay[i].loanPaymantsStatus.sumPadeUp % this.loanerToDisplay[i].loaner.monthlyPaymentSum;
              }
              else {

                this.loanerToDisplay[i].loanPaymantsStatus = new LoanPaymantsStatus();
                this.loanerToDisplay[i].loanPaymantsStatus.sumLeft = this.loanerToDisplay[i].loaner.sum;
                this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerePayed = this.loanerToDisplay[i].loaner.sum / this.loanerToDisplay[i].loaner.monthlyPaymentSum;
                this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerentPayed = this.loanerToDisplay[i].loaner.paymentsNumber;
                this.loanerToDisplay[i].loanPaymantsStatus.rest = this.loanerToDisplay[i].loaner.sum;
              }
            }
            else {
              this.loanerToDisplay[i].loanPaymantsStatus = new LoanPaymantsStatus();
              this.loanerToDisplay[i].loanPaymantsStatus.sumLeft = 0;
              this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerePayed = this.loanerToDisplay[i].loaner.paymentsNumber;
              this.loanerToDisplay[i].loanPaymantsStatus.numberOfPaymentsThatWerentPayed = 0;
              this.loanerToDisplay[i].loanPaymantsStatus.rest = 0;
            }
            i += 1;
          });
        });
      }, err => {
        this.userList = [];
      });
    }, err => {
      this.loansList = [];
    });
    this.tmpLoaner = this.loanerToDisplay
    console.log(this.loanerToDisplay)
  }
  ngOnInit() {
  }

}
