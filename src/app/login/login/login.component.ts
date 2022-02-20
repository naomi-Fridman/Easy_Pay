import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { MangerDetails } from "src/app/models/MangerDetails";
import { InputTextModule } from "primeng/inputtext";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  validations = {
    userName: true,
    password: true,
  };
  updateValidations(field: string, isValid: boolean) {
    console.log(this.manager);
    this.validations[field] = isValid;
  }
  manager: MangerDetails;
  LogIn(userName: string, pass: string) {
    if (
      pass != "" &&
      userName != "" &&
      this.validations.password &&
      this.validations.userName
    ) {
      this.loginService.getUserFromServer(pass, userName).subscribe(
        (data) => {
          if (data !== null) {
            this.manager = data;
            localStorage.setItem("manager", JSON.stringify(data));
            this.router.navigate(["/homePage"]);
          } else this.register();
        },
        (err) => {
          alert("לא נמצא מידע!!");
          this.manager = null;
          localStorage.removeItem("manager");
          this.register();
        }
      );
    } else {
      alert("חסר נתונים");
    }
  }
  register() {
    this.router.navigate(["/register"]);
  }
  ngOnInit() {}
}
