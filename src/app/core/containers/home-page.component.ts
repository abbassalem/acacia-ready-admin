import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <p>
      
      <span class="appTitle">Welcome to Acacia Admin</span>
    </p>
  `,
  styles: [`
    .appTitle{
      align-self: flex-start;
      font-size: 16px;
      color: rgb(255,165,0);
      padding-top: 8px;
      padding-right: 5px;
      justify: center;
      font-family: Arial;
      font-stretch: expanded;
      font-weight: bold;
      font-variant: small-caps ;

    }
  `]
})
export class HomePageComponent {
 
}
