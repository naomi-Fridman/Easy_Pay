import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = true;

  newLoan(){
    this.router.navigate(["/newLoan"]);
  }
  newDeposite(){
    this.router.navigate(["/newDeposite"]);
  }
  newPayment(){
    this.router.navigate(["/newPayment"]);
  }
  constructor(private router: Router) {
  }
  ngOnInit() {
    
  }
}
