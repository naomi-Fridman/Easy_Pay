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
  updateUser: User = new User();
  userDetailesForm: FormGroup = new FormGroup({
    password: new FormControl(""),
    id: new FormControl(""),
    userName: new FormControl(""),
    firstName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    lastName: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    identityNumber: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    address: new FormControl(""),
    cellphoneNumber: new FormControl("", { validators: [Validators.required], updateOn: 'blur' }),
    telephoneNumber: new FormControl(""),
    email: new FormControl("", { validators: [Validators.email], updateOn: 'blur' }),
    comments: new FormControl("")
  });

  get userDetailesFormControl() { return this.userDetailesForm.controls; }

  @Input() user = new User();

  save() {
    this.updateUser = this.userDetailesForm.value;
      this.userService.updateUser(this.userDetailesForm.value).subscribe(data => {
      })
  }
  disableSave(){
    if(this.userDetailesForm.status=='INVALID'  )return false;
    return true;
  }
  constructor(private _acr: ActivatedRoute, private userService: UsersService, private messageService: MessageService) { }

  ngOnInit() {
    this._acr.paramMap.subscribe(params => {
      this.id = JSON.parse(params.get("userId"));
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data
        this.userDetailesForm.controls["id"].setValue(this.user.id);
        this.userDetailesForm.controls["identityNumber"].setValue(this.user.identityNumber);
        this.userDetailesForm.controls["firstName"].setValue(this.user.firstName);
        this.userDetailesForm.controls["lastName"].setValue(this.user.lastName);
        this.userDetailesForm.controls["cellphoneNumber"].setValue(this.user.cellphoneNumber);
        this.userDetailesForm.controls["telephoneNumber"].setValue(this.user.telephoneNumber);
        this.userDetailesForm.controls["email"].setValue(this.user.email);
        this.userDetailesForm.controls["address"].setValue(this.user.address);
        this.userDetailesForm.controls["comments"].setValue(this.user.comments);
      }), err => {
        this.user = null;
      }
    })
  }
}
