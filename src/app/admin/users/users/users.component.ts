import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MessageService } from 'primeng/api';
import { DTO_userParms } from 'src/app/models/DTO_userParms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  cityList:string[]=new Array('ב"ב','ירושלים');
  usersList: User[];
  dto_user:DTO_userParms=new DTO_userParms();
  address: boolean;
  listAddress: string[];
  city: any;
  cities: any[];
  filteredCitiesSingle: any[];


  filterCitySingle(event) {
    let query = event.query;
        this.userService.getAddress(query).subscribe(c => {debugger
            this.filteredCitiesSingle = this.filterCity(query, c);
        });
    // this.userService.autoComplet(event.query).subscribe((data: Array<string>) => {
    //     this.filteredCitiesSingle = data;
    // });
}
filterCity(query, cities: any[]):any[] {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : any[] = [];
  for(let i = 0; i < cities.length; i++) {
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
  onConfirm(userId: number){
    this.userService.deleteUser(userId).subscribe(() => {alert("deleted")},err=> {alert("not deleted")});
    this.messageService.clear('c');
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }
  onReject() {
    this.messageService.clear('c');
  }
  getAllUsers(){
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

  constructor(private adminService: AdminService, private router: Router, private userService: UsersService, private messageService: MessageService) {
    this.userService.getAllUsers(this.dto_user).subscribe(data => {
  
      console.log(data)
      this.usersList = data;
    }, err => {
      this.usersList = [];
    });
  }


  ngOnInit() {
  }

}
