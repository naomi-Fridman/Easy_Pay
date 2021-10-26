import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { PaymentsService } from '../../../services/payments.service';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/User';
//import {SelectItemGroup} from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { DTO_Payments } from 'src/app/models/DTO_Payments';
import { DTO_userParms } from 'src/app/models/DTO_userParms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {
  selectedSearchType: SelectItem
  allPayments: Payment[]
  paymentsUser: User[]
  paymentListToDisplay: PaymentUser[] = new Array()
  paymentListToDisplayB: PaymentUser[] = new Array()
  datesArr: SelectItem[]
  arr: string[]
  paymentUser1: PaymentUser
  display: boolean = false
  dtoPayments: DTO_Payments = new DTO_Payments();
  dtoUsers:DTO_userParms=new DTO_userParms();
  userList: User[]
  selectedSum: string = "sum";
  singlePayment: Payment;
  displayStyle: string;
  
  openPopup(payment:Payment) {
    this.singlePayment=payment;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
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
  showDetails(_paymentUser: PaymentUser) {
    this.paymentUser1 = _paymentUser;
    this.display = true;
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

  constructor(private paymentsService: PaymentsService, private userService: UsersService, private router: Router) {
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
        })
        this.datesArr = [
          // {label: 'היום', value: Date},
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
      payment => payment.payment.paymentDate === date);
  }
  rangeDates(dateA: Date, dateB: Date) {
    this.paymentListToDisplay = this.paymentListToDisplayB;
    this.paymentListToDisplay.filter(
      payment => payment.payment.paymentDate >= dateA && payment.payment.paymentDate <= dateB);
  }
  ngOnInit() {
  }
}

