import { Component, OnInit } from '@angular/core';
import { DTO_User } from 'src/app/models/DTO_User';
import { Payment } from 'src/app/models/Payment';
import { DTO_Payments } from 'src/app/models/DTO_Payments';
import { DTO_searchParms } from 'src/app/models/DTO_searchParms';
import { PaymentsService } from '../../services/payments.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Loaner } from 'src/app/models/Loaner';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { DTO_loans } from 'src/app/models/DTO_loans';
import { Loan } from 'src/app/models/Loan';
import { CurrancyService } from 'src/app/services/currancy.service';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.css']
})
export class DailyActivityComponent implements OnInit {
  currencyValue:number
  todaysUsersListThatWerentPaid: DTO_User[]
  todaysPaymentsList: Payment[]
  dtoPayments: DTO_Payments = new DTO_Payments()
  datePipe: any;
  dtoLoan: DTO_loans = new DTO_loans();
  loansListToday: Loan[] = new Array();
  loanerList: Loaner[] = new Array();
  loaner: Loaner;
  dtoUsersPrms: DTO_searchParms = new DTO_searchParms()
  dtoPayment: DTO_Payments = new DTO_Payments()
  allIncomingPaymentsTodayList: Payment[];
  userPayment: PaymentUser;
  userPaymentList: PaymentUser[] = new Array();

  constructor(private paymentsService: PaymentsService, private currencyService:CurrancyService ,private userService: UsersService, private loanService: LoansService, private router: Router) { }
  ngOnInit() {
    this.currencyService.getExchangeRate().subscribe(data=>{
      this.currencyValue=data.conversion_rates["ils"];
    });
    this.todaysPaymentsList = new Array()
    const date = new Date(Date.now())
    //var tryOut = new Date(Date.parse('2020/07/01'));
    this.paymentsService.getAllPaymentsThatWerentPadeByDate(date).subscribe(data => {
      this.todaysUsersListThatWerentPaid = data;
    })
    this.dtoPayment.dateExact = new Date();
    this.dtoLoan.dateExact = new Date();
    this.paymentsService.getAllPayments(this.dtoPayment).subscribe(data => {
      this.allIncomingPaymentsTodayList = data;
      this.allIncomingPaymentsTodayList.forEach(payment => {
        var i = 0;
        this.userService.getUserById(payment.userId).subscribe(user => {
          this.userPayment = new PaymentUser();
          this.userPayment.payment = payment;
          this.userPayment.user = user;
          this.userPaymentList.push(this.userPayment);
        })
      })
    })
    err => (
      this.allIncomingPaymentsTodayList = []
    )
    this.loanService.getAllLoans(this.dtoLoan).subscribe(loans => {
      this.loansListToday = loans;
      this.loansListToday.forEach(loan => {
        this.userService.getUserById(loan.userId).subscribe(user => {
          this.loaner = new Loaner();
          this.loaner.user = user;
          this.loaner.loaner = loan;
          this.loanerList.push(this.loaner);
        })
      })
    })
  }
}
