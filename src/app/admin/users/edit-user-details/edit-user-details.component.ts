import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {
  id: number;
  user1: User;
  _user: User;

  get userDetailesFormControl() { return this.userDetailesForm.controls; }

  @Input()
  set user(value: User) {
    this._user = value;
    this.userDetailesForm.controls["id"].setValue(this._user.id);
    this.userDetailesForm.controls["identityNumber"].setValue(this._user.identityNumber);
    this.userDetailesForm.controls["firstName"].setValue(this._user.firstName);
    this.userDetailesForm.controls["lastName"].setValue(this._user.lastName);
    this.userDetailesForm.controls["telephoneNumber"].setValue(this._user.telephoneNumber);
    this.userDetailesForm.controls["cellphoneNumber"].setValue(this._user.cellphoneNumber);
    this.userDetailesForm.controls["email"].setValue(this._user.email);
    this.userDetailesForm.controls["address"].setValue(this._user.address);
    this.userDetailesForm.controls["comments"].setValue(this._user.comments);
  }
  userDetailesForm: FormGroup = new FormGroup({
    password: new FormControl(""),
    id: new FormControl(""),
    userName: new FormControl(""),
    firstName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    identityNumber: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
    address: new FormControl(""),
    city: new FormControl(""),
    telephoneNumber1: new FormControl(""),
    telephoneNumber2: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    email: new FormControl("", { validators: [Validators.email], updateOn: 'blur' }),
    comments: new FormControl("")
  });
  updateUser: User;

  save() {
    this.updateUser = this.userDetailesForm.value;
    if (this.userDetailesFormControl.valid && this.userDetailesFormControl.valid) {
      alert("valid");
      this.userService.updateUser(this.updateUser).subscribe(data => {
      })
    }
    else {
      alert("not valid");
    }
  }
  
  constructor(private _acr: ActivatedRoute, private userService: UsersService, private messageService: MessageService) {
    this._acr.paramMap.subscribe(params => {
      this.id = JSON.parse(params.get("userId"));
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data;
      }), err => {
        this.user = null;
      }
    })
  }
  ngOnInit() {
  }
}
