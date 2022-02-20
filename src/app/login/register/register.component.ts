import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MangerDetails } from "src/app/models/MangerDetails";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  manager: MangerDetails = new MangerDetails();
  isAllValid: false;
  validations = {
    password: true,
    userName: true,
    firstName: true,
    lastName: true,
  };
  constructor(private router: Router, private loginService: LoginService) {}
  // this.router.navigate(['/deposit']);
  updateValidations(field: string, isValid: boolean) {
    console.log(this.manager);
    this.validations[field] = isValid;
  }
  save() {
    if (
      this.validations.firstName &&
      this.validations.lastName &&
      this.validations.password &&
      this.validations.userName &&
      this.manager.UserName &&
      this.manager.FirstName &&
      this.manager.LastName &&
      this.manager.Password
    ) {
      console.log(this.manager);
      if (this.validations)
        this.loginService.saveManagerInServer(this.manager).subscribe(
          (data) => {
            console.log(data);
            this.manager.Id = data;
            localStorage.setItem("manager", JSON.stringify(this.manager));
            this.router.navigate(["/homePage"]);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      alert("יש שדות חובה ריקים");
    }
  }
  ngOnInit() {}
}
