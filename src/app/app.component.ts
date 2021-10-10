import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrancyService } from './services/currancy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GmachProject';
  isLogged = true;
  items3: MenuItem[]
  currencyValue: any;
  display = true;
  links = [
    { label: 'דף הבית', routerLink: 'homePage' },
    { label: 'הלוואות', routerLink: 'loans' },
    { label: 'הפקדות', routerLink: 'deposites' },
    { label: 'משתמשים', icon: 'pi pi-users', routerLink: 'users' },
    { label: 'תשלומים', routerLink: 'payments' }
  ];
  constructor(private router: Router, private currencyService: CurrancyService, public route: ActivatedRoute) {
    this.currencyService.getExchangeRate().subscribe(data => {
      this.currencyValue = data.conversion_rates["ils"];
    });
  }
  ngOnInit() {
    this.items3 = [

      { label: 'הלוואות', routerLink: ['/loans'] },
      { label: 'הפקדות', routerLink: ['/deposites'] },
      { label: 'משתמשים', icon: 'pi pi-users', routerLink: ['/users'] },
      { label: 'תשלומים', routerLink: ['/payments'] },
      { label: 'דף הבית', routerLink: ['/homePage'] }
    ];

  }
}
