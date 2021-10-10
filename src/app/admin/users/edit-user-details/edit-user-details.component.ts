import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {
  id: number;
  user1: User;
  _user:User;
  
  @Input()
  set user(value: User) {
    this._user = value;
    
    this.userDetailesForm.controls["id"].setValue(this._user.id);
    this.userDetailesForm.controls["password"].setValue(this._user.password);
    this.userDetailesForm.controls["userName"].setValue(this._user.userName);
    this.userDetailesForm.controls["firstName"].setValue(this._user.firstName);
    this.userDetailesForm.controls["lastName"].setValue(this._user.lastName);
    this.userDetailesForm.controls["telephoneNumber1"].setValue(this._user.telephoneNumber1);
    this.userDetailesForm.controls["telephoneNumber2"].setValue(this._user.telephoneNumber2);
    this.userDetailesForm.controls["email"].setValue(this._user.email);
    this.userDetailesForm.controls["address"].setValue(this._user.address);
    this.userDetailesForm.controls["city"].setValue(this._user.city);
    this.userDetailesForm.controls["comments"].setValue(this._user.comments);
  }
  userDetailesForm: FormGroup = new FormGroup({
    password: new FormControl(""),
    id: new FormControl(""),
    userName: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    identityNumber: new FormControl(""),
    address: new FormControl(""),
    city: new FormControl(""),
    telephoneNumber1: new FormControl(""),
    telephoneNumber2: new FormControl(""),
    email: new FormControl(""),
    comments: new FormControl("")
  });
  updateUser: User ;
 
  save() {
    this.updateUser = this.userDetailesForm.value;
    this.userService.updateUser(this.updateUser).subscribe(data=>{
    //       if(this._user!=this.updateUser)
    // debugger
    //     this.msgs.push({ severity: 'success', summary: 'עדכון הפקדה', detail: 'העדכון בוצע בהצלחה' });

    })  
    
  }
  constructor(private _acr: ActivatedRoute, private userService: UsersService, private messageService: MessageService) {
    this._acr.paramMap.subscribe(params => {
      this.id = JSON.parse(params.get("userId"));
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data;
        this.userDetailesForm.controls["userId"].setValue(this.user.id);
        this.userDetailesForm.controls["password"].setValue(this.user.password);
        this.userDetailesForm.controls["userName"].setValue(this.user.userName);
        this.userDetailesForm.controls["firstName"].setValue(this.user.firstName);
        this.userDetailesForm.controls["lastName"].setValue(this.user.lastName);
        this.userDetailesForm.controls["telephoneNumber1"].setValue(this.user.telephoneNumber1);
        this.userDetailesForm.controls["telephoneNumber2"].setValue(this.user.telephoneNumber2);
        this.userDetailesForm.controls["email"].setValue(this.user.email);
        this.userDetailesForm.controls["address"].setValue(this.user.address);
        this.userDetailesForm.controls["city"].setValue(this.user.city);
        this.userDetailesForm.controls["comments"].setValue(this.user.comments);
      }), err => {
        this.user = null;
      }
    })
  }
  ngOnInit() {
  }
}
