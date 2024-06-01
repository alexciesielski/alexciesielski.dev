import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet />`,
  host: {
    class: 'block p-4 h-screen w-screen overflow-auto cursor-default',
  },
})
export class AppComponent {}
