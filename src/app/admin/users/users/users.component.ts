import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MessageService } from 'primeng/api';
import { DTO_userParms } from 'src/app/models/DTO_userParms';
import { Deposit } from 'src/app/models/Deposit';
import { Loan } from 'src/app/models/Loan';
import { DepositesService } from 'src/app/services/deposites.service';
import { LoansService } from 'src/app/services/loans.service';
import { async } from '@angular/core/testing';
import { DTO_loans } from 'src/app/models/DTO_loans';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  cityList: string[] = new Array('ב"ב', 'ירושלים');
  usersList: User[];
  dto_user: DTO_userParms = new DTO_userParms();
  dto_loan: DTO_loans = new DTO_loans();
  address: boolean;
  listAddress: string[];
  city: any;
  cities: any[];
  filteredCitiesSingle: any[];
  userDepositors: User[] = new Array();
  depositors: Deposit[] = new Array();
  userLoaners: User[] = new Array();
  loaners: Loan[] = new Array();
  usersTemp: User[] = new Array();
  viewOptions: any[];
  value2: string;
  checked1: boolean ;
  checked2: boolean = true;

  filterTheUsers(event){
    if(event.option["value"].value==1){
      this.getAllLoaners();
    }
    else if(event.option["value"].value==2){
      this.getAllDepositors()
    }
    else
    this.getAllUsers();
  }
  getAllDepositors() {
    this.usersList = this.usersTemp;
    this.depositService.getAllDeposits().subscribe(data => {
      if (data) {
        this.usersList.forEach(u => {
          data.forEach(d => {
            if (d.userId == u.id) {
              this.userDepositors.push(u);
            }
          })
        })
      }
      this.usersTemp = this.usersList;
      this.usersList = this.userDepositors;
      this.userDepositors = [];
    })
  }
  getAllLoaners() {
    this.usersList = this.usersTemp;
    this.loansService.getAllLoans(this.dto_loan).subscribe(data => {
      if (data) {
        this.usersList.forEach(u => {
          data.forEach(l => {
            if (l.userId == u.id) {
              this.userLoaners.push(u);
            }
          })
        })
      } 
      this.usersTemp = this.usersList;
      this.usersList = this.userLoaners;
      this.userLoaners = [];
    })
  }
  filterCitySingle(event) {
    let query = event.query;
    this.userService.getAddress(query).subscribe(c => {
      this.filteredCitiesSingle = this.filterCity(query, c);
    });
    // this.userService.autoComplet(event.query).subscribe((data: Array<string>) => {
    //     this.filteredCitiesSingle = data;
    // });
  }
  filterCity(query, cities: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < cities.length; i++) {
      let city = cities[i];
      if (city.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }
    return filtered;
  }
  edit(user: User) {
    this.router.navigate(['/editUserDetails', JSON.stringify(user.id)]);
  }
  onConfirm(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => { alert("deleted") }, err => { alert("not deleted") });
    this.messageService.clear('c');
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }
  onReject() {
    this.messageService.clear('c');
  }
  getAllUsers() {
    this.userService.getAllUsers(this.dto_user).subscribe(data => {
      this.usersList = data;
      
      if (this.usersList.length == 0) {
        this.usersList = []
      }
    })
  }
  setlistAddress(text) {
    this.address = false;
    this.userService.getAddress(text).subscribe((data: Array<string>) => {

      this.listAddress = data;
      this.address = true;
      console.log(this.listAddress)
    });
  }

  constructor(private loansService: LoansService, private depositService: DepositesService, private adminService: AdminService, private router: Router, private userService: UsersService, private messageService: MessageService) {
    this.userService.getAllUsers(this.dto_user).subscribe(data => {
      console.log(data)
      this.usersList = data;
      this.usersTemp = data;
    }, err => {
      this.usersList = [];
    });

    this.viewOptions = [
      {name: 'הצג את הלווים', value: 1},
      {name: 'הצג את המפקידים', value: 2},
      {name: 'הצג את כל המשתמשים', value: 3}
  ];
  }
  ngOnInit() {
    
  }
}
