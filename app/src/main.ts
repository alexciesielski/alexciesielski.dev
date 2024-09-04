import { bootstrapApplication } from '@angular/platform-browser';
import { inject as va } from '@vercel/analytics';
import 'zone.js';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

va({ framework: 'angular' });
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
