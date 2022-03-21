import { Component, OnInit, Output } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { Deposit } from 'src/app/models/Deposit';
import { User } from 'src/app/models/User';
import { Depositor } from 'src/app/models/Depositor';
import { Message } from 'primeng/api/message';
import { DepositesService } from '../../../services/deposites.service';
import { Observable } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { DTO_searchParms } from 'src/app/models/DTO_searchParms';

@Component({
  selector: 'app-deposites',
  templateUrl: './deposites.component.html',
  styleUrls: ['./deposites.component.css']
})
export class DepositesComponent implements OnInit {
  depositsList: Deposit[];
  tmpDepositsList: Depositor[];
  userList: User[];
  flag: boolean;
  depositorToDisplay: Depositor[];
  depositor1: Depositor;
  dtoUsersPrms: DTO_searchParms = new DTO_searchParms();
  display: boolean = false;
  displayStyle: string;
  singleDeposite: Depositor;
  success: boolean =false;
  massege:string="ההפקדה נמחקה בהצלחה!!"
  close(){
    this.success=false;
  }
  openPopup(deposite: Depositor) {
    this.singleDeposite = deposite;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  editDetails(depositor: Depositor) {
    this.router.navigate(['/editDetails', { "depositor": JSON.stringify(depositor) }]);
  }
  showDetails(depositor: Depositor) {
    this.depositor1 = depositor;
    this.display = true;
  }
  deleteDepositor(id: number) {
    let depositorIndex = this.depositorToDisplay.findIndex(d=>d.deposite.id=id)
    this.depositesService.deleteDepositor(id).subscribe(data => {
      this.depositorToDisplay.splice(depositorIndex,1);
      this.displayStyle = "none";
      this.success=true
    })
  }
  search(){
    this.depositorToDisplay=this.tmpDepositsList;
    if(this.dtoUsersPrms.identityNumber!=undefined && this.dtoUsersPrms.identityNumber!="")
    this.depositorToDisplay=this.depositorToDisplay.filter(item => item.user.identityNumber.indexOf(this.dtoUsersPrms.identityNumber) !== -1);
    if(this.dtoUsersPrms.firstName!=undefined && this.dtoUsersPrms.firstName!="")
    this.depositorToDisplay=this.depositorToDisplay.filter(item => item.user.firstName.indexOf(this.dtoUsersPrms.firstName) !== -1);
    if(this.dtoUsersPrms.lastName!=undefined && this.dtoUsersPrms.lastName!="")
    this.depositorToDisplay=this.depositorToDisplay.filter(item => item.user.lastName.indexOf(this.dtoUsersPrms.lastName) !== -1);
    if(this.dtoUsersPrms.address!=undefined && this.dtoUsersPrms.address!="")
    this.depositorToDisplay=this.depositorToDisplay.filter(item => item.user.address.indexOf(this.dtoUsersPrms.address) !== -1);
    if(this.dtoUsersPrms.sum!=undefined && this.dtoUsersPrms.sum!=null)
    this.depositorToDisplay=this.depositorToDisplay.filter(item => item.deposite.sum.toString().indexOf(this.dtoUsersPrms.sum.toString()) !== -1);
    // if(this.dtoUsersPrms.date!=undefined && this.dtoUsersPrms.date!="")
    // this.depositorToDisplay=this.depositorToDisplay.filter(item => item.deposite.date.toString().slice(0,).indexOf(this.dtoUsersPrms.date) !== -1);  
  }
__________
  constructor(private userService: UsersService, private router: Router, private depositesService: DepositesService) { }

  ngOnInit() {
    this.depositorToDisplay = new Array()
    this.depositesService.getAllDeposits().subscribe(data => {
      this.flag = true;
      this.depositsList = data;
      console.log(this.depositsList);
      this.userService.getAllUsers(this.dtoUsersPrms).subscribe(data => {
        this.userList = data;
        console.log(this.userList);
        var i = 0;
        this.userList.forEach(user => {
          this.depositsList.forEach(deposit => {
            if (user.id == deposit.userId) {
              this.depositorToDisplay[i] = new Depositor()
              this.depositorToDisplay[i].user = user;
              this.depositorToDisplay[i].deposite = deposit;
              this.depositorToDisplay[i].currancyType = deposit.currencyId == 3 ? 'שקל' : "דולר";
              i++;
            }
          });
        });
        this.tmpDepositsList=this.depositorToDisplay
        console.log(this.depositorToDisplay);
      }, err => {
        this.userList = [];
      });
    }, err => {
      this.depositsList = [];
    });
  }

}
