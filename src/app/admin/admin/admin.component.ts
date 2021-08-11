import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Loan } from 'src/app/models/Loan';
import { User } from 'src/app/models/User';
import {MenuItem} from 'primeng/api';
import { Payment } from 'src/app/models/Payment';
import { PaymentUser } from 'src/app/models/PaymentUser';
import { PaymentsService } from '../../services/payments.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { DTO_Payments } from 'src/app/models/DTO_Payments';
import { DTO_userParms } from 'src/app/models/DTO_userParms';
import { DTO_User } from 'src/app/models/DTO_User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   
  //paymentsUser: User[]
  //todaysUsersListThatWerentPaidToDisplay: PaymentUser[] = new Array()
  todaysUsersListThatWerentPaid:DTO_User[]
  todaysPaymentsList:Payment[]
  dtoPayments:DTO_Payments=new DTO_Payments()
  datePipe: any;
  dtoUsersPrms:DTO_userParms=new DTO_userParms()
  //userList:User[]
  //dto_userList:DTO_User[]
  constructor(private paymentsService: PaymentsService, private userService: UsersService, private router: Router) {
    
  }
    ngOnInit() {
    this.todaysPaymentsList=new Array()
    const date=new Date(Date.now())
  
    var tryOut=new Date(Date.parse('2020/07/01'));
    this.paymentsService.getAllPaymentsThatWerentPadeByDate(date)
    .subscribe(data => {
      
      this.todaysUsersListThatWerentPaid=data;







      //this.todaysPaymentsList = data;
      // this.userService.getAllUsers(this.dtoUsers).subscribe(users => {
      //   this.userList = users;
      //   var i = 0;
      //   if (this.todaysPaymentsList == []) {
      //     this.todaysPaymentsListThatWerentPaidToDisplay = [];
      //   }
      //   this.todaysPaymentsList.forEach(payment => {
      //     this.userList.forEach(user => {
      //       if (payment.userId == user.id) {
      //         this.todaysPaymentsListThatWerentPaidToDisplay[i] = new PaymentUser();
      //         this.todaysPaymentsListThatWerentPaidToDisplay[i].payment = payment;
      //         this.todaysPaymentsListThatWerentPaidToDisplay[i].user = user;
      //         i += 1;
      //       }
      //     })
        //  })
      // })
   })
        // this.items3 = [
        //     {label: 'הלוואות', routerLink:'/loans'},
        //     {label: 'הפקדות', routerLink:'/deposites' },
        //     {label: 'משתמשים', icon: 'pi pi-users', routerLink:'/users'},
        //     {label: 'תשלומים', routerLink:'/payments'}
        // ];
    }
}

