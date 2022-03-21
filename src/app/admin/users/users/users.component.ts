import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MessageService } from 'primeng/api';
import { DTO_searchParms } from 'src/app/models/DTO_searchParms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  cityList: string[] = new Array('ב"ב', 'ירושלים');
  usersList: User[] = new Array();
  tmpUsersList: User[] = new Array();
  dto_user: DTO_searchParms = new DTO_searchParms();

  address: boolean;
  listAddress: string[];
  city: any;
  cities: any[];
  filteredCitiesSingle: any[];
  displayStyle = "none";
  singleUser: User;
  success: boolean = false;
  massege: string = "המשתמש וכל המידע שקשור אליו נמחקו!!"

  openPopup(user: User) {
    this.singleUser = user;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  edit(user: User) {
    this.router.navigate(['/editUserDetails', JSON.stringify(user.id)]);
  }
  deleteUser(id: number) {
    let userIndex = this.usersList.findIndex(u => u.id = id)
    this.userService.deleteUser(id).subscribe(data => {
      this.usersList.splice(userIndex, 1);
      this.displayStyle = "none";
      this.success = true
    })
  }
  getAllUsers() {
    this.userService.getAllUsers(this.dto_user).subscribe(data => {
      this.usersList = data;
      this.tmpUsersList = data;
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
    
search(){
  this.usersList=this.tmpUsersList;
  if(this.dto_user.identityNumber!=undefined && this.dto_user.identityNumber!="")
  this.usersList=this.usersList.filter(item => item.identityNumber.indexOf(this.dto_user.identityNumber) !== -1);
  if(this.dto_user.firstName!=undefined && this.dto_user.firstName!="")
  this.usersList=this.usersList.filter(item => item.firstName.indexOf(this.dto_user.firstName) !== -1);
  if(this.dto_user.lastName!=undefined && this.dto_user.lastName!="")
  this.usersList=this.usersList.filter(item => item.lastName.indexOf(this.dto_user.lastName) !== -1);
  if(this.dto_user.address!=undefined && this.dto_user.address!="")
  this.usersList=this.usersList.filter(item => item.address.indexOf(this.dto_user.address) !== -1);
  if(this.dto_user.tellephoneNumber!=undefined && this.dto_user.tellephoneNumber!=""){
        this.usersList=this.tmpUsersList.filter(item => item.telephoneNumber.indexOf(this.dto_user.tellephoneNumber) !== -1);
        var e=this.tmpUsersList.filter(item => item.cellphoneNumber.indexOf(this.dto_user.tellephoneNumber) !== -1);
  }
}

  constructor(private router: Router, private userService: UsersService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllUsers();
  }
}
