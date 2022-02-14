import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { PaymentsService } from '../../../services/payments.service';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { DTO_Payments } from 'src/app/models/DTO_Payments';
import { DTO_userParms } from 'src/app/models/DTO_userParms';
import { LoansService } from 'src/app/services/loans.service';
import { DTO_loans } from 'src/app/models/DTO_loans';
import { Loan } from 'src/app/models/Loan';
import { PaymentsDetailsComponent } from '../payments-details/payments-details.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {
  selectedSearchType: SelectItem
  allPayments: Payment[]
  paymentsUser: User[]
  paymentsLoans: Loan[];
  paymentListToDisplay: PaymentUser[] = new Array()
  paymentListToDisplayB: PaymentUser[] = new Array()
  datesArr: SelectItem[]
  arr: string[]
  paymentUser1: PaymentUser
  display: boolean = false
  dtoPayments: DTO_Payments = new DTO_Payments();
  dtoUsers: DTO_userParms = new DTO_userParms();
  dtoLoan: DTO_loans = new DTO_loans();
  userList: User[]
  selectedSum: string = "sum";
  displayStyle = "none";
  displayEditModal = "none";
  modalMessage = "האם אתה בטוח שברצןנך למחוק תשלום זה לצמיתות?"

  @ViewChild(PaymentsDetailsComponent, { static: false })
  paymentDetailsComponent: PaymentsDetailsComponent;


  ngAfterViewInit() {

  }
  deletePayment() {
    let pymntId = this.paymentUser1.payment.id;
    let paymentIndex = this.paymentListToDisplay.findIndex(p => p.payment.id = pymntId)
    this.paymentsService.deletePayment(pymntId).subscribe(data => {
      if (data == 1) {
        this.paymentListToDisplay.splice(paymentIndex, 1);
        this.modalMessage = "התשלום נמחק בהצלחה"
      }
      else {
        this.modalMessage = "הפעולה נכשלה"
      }

    })
  }
  
   editPayment() {
      this.paymentDetailsComponent.editDetails().subscribe(res=>{
      if(res==1){
        this.modalMessage="התשלום עודכן בהצלחה"
        this.closeEditModal()
        this.openPopup(this.paymentUser1);
      }
      else{
        this.modalMessage="העדכון נכשל! נסה שנית!"
        this.closeEditModal()
        this.openPopup(this.paymentUser1);
       }
    }); 
  }
  openPopup(_paymentUser: PaymentUser) {
    this.displayStyle = "block";
    this.paymentUser1 = _paymentUser;
  }
  closePopup() {
    this.displayStyle = "none";
    this.modalMessage = "האם אתה בטוח שברצןנך למחוק תשלום זה לצמיתות?"
  }
  closeEditModal() {
    this.displayEditModal = "none";
  }
  edit(payment: PaymentUser) {
    this.paymentUser1 = payment;
    this.displayEditModal = "block";
  }
  close(){
    if (this.modalMessage=="האם אתה בטוח שברצןנך למחוק תשלום זה לצמיתות?") {
      this.deletePayment();
    }
    else{
      this.closePopup();
    }
  }
  onChange(newValue: string) {
    if (newValue == "from") {
      this.dtoPayments.collectionSumExact = null;
      this.dtoPayments.collectionSumTill = null;
    }
    else if (newValue == "till") {
      this.dtoPayments.collectionSumFrom = null;
      this.dtoPayments.collectionSumExact = null;
    }
    else if (newValue = "exact") {
      this.dtoPayments.collectionSumFrom = null;
      this.dtoPayments.collectionSumTill = null;
    }
    else {
      this.dtoPayments.collectionSumExact = null;
    }
  }

  getAllPayments() {
    this.paymentsService.getAllPayments(this.dtoPayments).subscribe(data => {
      this.allPayments = data;
      var i = 0;
      this.paymentListToDisplay = []
      if (this.allPayments.length == 0) {
        this.paymentListToDisplay = []
      }
      this.allPayments.forEach(payment => {
        this.paymentsUser.forEach(user => {
          if (payment.userId == user.id) {
            this.paymentListToDisplay[i] = new PaymentUser();
            this.paymentListToDisplay[i].payment = payment;
            this.paymentListToDisplay[i].user = user;
            i += 1;
          }
        })
      })
      this.paymentListToDisplayB = this.paymentListToDisplay;
    });
  }

  constructor(private paymentsService: PaymentsService, private userService: UsersService, private loanService: LoansService, private router: Router) {
    this.allPayments = new Array();
    this.paymentsService.getAllPayments(this.dtoPayments)
      .subscribe(data => {
        this.allPayments = data;
        this.userService.getAllUsers(this.dtoUsers).subscribe(users => {
          this.paymentsUser = users;
          var i = 0;
          if (this.allPayments == []) {
            this.paymentListToDisplay = [];
          }
          else {
            this.loanService.getAllLoans(this.dtoLoan).subscribe(loans => {
              this.paymentsLoans = loans;
              this.allPayments.forEach(payment => {
                this.paymentsUser.forEach(user => {
                  if (payment.userId == user.id) {
                    this.paymentsLoans.forEach(loan => {
                      if (payment.loanId == loan.id && loan.paidUp == false) {
                        this.paymentListToDisplay[i] = new PaymentUser();
                        this.paymentListToDisplay[i].payment = payment;
                        this.paymentListToDisplay[i].user = user;
                        this.paymentListToDisplay[i].loan = loan;
                        i += 1;
                      }
                    })

                  }
                })
              })

            })
          }

          this.paymentListToDisplayB = this.paymentListToDisplay;
        })
        this.datesArr = [
          { label: 'אתמול', value: 'אתמול' },
          { label: 'בשבוע הנוכחי', value: 'בשבוע הנוכחי' },
          { label: 'בחודש האחרון', value: 'Honda' },
          { label: 'לפי בחירה', value: 'Ford' },
          { label: 'range', value: 'Honda' }
        ];
      });
    var inputDate = new Date(2);
    this.arr = [
      "היום",
      "אתמול",
      "בשבוע הנוכחי",
      "בחודש האחרון",
      "לפי בחירה",
      "range"
    ];

  }
  searchDyDate(date: Date) {
    this.router.navigate(['/search', JSON.stringify(date)]);
  }
  filterByDate(date: Date) {
    this.paymentListToDisplay = this.paymentListToDisplayB;
    this.paymentListToDisplay.filter(
      payment => payment.payment.date === date);
  }
  rangeDates(dateA: Date, dateB: Date) {
    this.paymentListToDisplay = this.paymentListToDisplayB;
    this.paymentListToDisplay.filter(
      payment => payment.payment.date >= dateA && payment.payment.date <= dateB);
  }
  ngOnInit() {
  }
}

