import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GmachProject';
  isLogged = true;
  items3: MenuItem[]
  currentChoice: string = "homePage";

  
  constructor(private router: Router) {
  
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
