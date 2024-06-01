import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import LandingComponent from './(landing)/landing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, RouterLink],
  template: ` <ac-landing /> `,
})
export default class HomeComponent {}
