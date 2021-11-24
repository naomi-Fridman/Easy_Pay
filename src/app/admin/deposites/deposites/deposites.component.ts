import { Component, OnInit, Output } from '@angular/core';
import {OrderListModule} from 'primeng/orderlist';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { Deposit } from 'src/app/models/Deposit';
import { User } from 'src/app/models/User';
import { Depositor } from 'src/app/models/Depositor';
import { Message } from 'primeng/api/message';
import { DepositesService } from '../../../services/deposites.service';
import { Observable } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { DTO_userParms } from 'src/app/models/DTO_userParms';

@Component({
  selector: 'app-deposites',
  templateUrl: './deposites.component.html',
  styleUrls: ['./deposites.component.css']
})
export class DepositesComponent implements OnInit {
  depositsList:Deposit[];
  userList:User[];
  flag:boolean;
  depositorToDisplay:Depositor[];
  depositor1:Depositor;
  dtoUsersPrms:DTO_userParms=new DTO_userParms();
  // :Observable< Depositor[]>;
  display: boolean = false;
  displayStyle: string;
  singleDeposite: Deposit;

  openPopup(deposite:Deposit) {
    this.singleDeposite=deposite;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  editDetails(depositor:Depositor){ 
    this.router.navigate(['/editDetails',JSON.stringify(depositor.deposite.id)]);
  }
  showDetails(depositor:Depositor){ 
    this.depositor1=depositor;
    this.display = true;
  }
  constructor(private userService:UsersService,private router:Router,private depositesService:DepositesService) { 
   
      this.depositorToDisplay=new Array()
      this.depositesService.getAllDeposits().subscribe(data=>{
      this.flag=true;   
      this.depositsList=data; 
      console.log(this.depositsList) ;
      this.userService.getAllUsers(this.dtoUsersPrms).subscribe(data=>{
      this.userList=data;
      console.log(this.userList) ;
       var i=0;
        this.userList.forEach(user => {
          this.depositsList.forEach(deposit => {
            if(user.id==deposit.userId)
            {
            this.depositorToDisplay[i]= new Depositor()            
            this.depositorToDisplay[i].user=user;
            this.depositorToDisplay[i].deposite=deposit;
            i++;
            }
          });     
        });
        console.log(this.depositorToDisplay);
        
    },err=>{
      this.userList=[];
    });
    },err=>{
      this.depositsList=[];
    }); 
  }
  
  
  ngOnInit() {
  }

}
