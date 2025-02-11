import { enableProdMode, importProvidersFrom } from '@angular/core';

import { MY_MOMENT_FORMATS } from './app/app.module';
import { environment } from './environments/environment';
import {
  Options,
  OptionsTokens,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OwlMomentDateTimeModule } from '../projects/picker/src/public_api';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      OwlMomentDateTimeModule,
    ),
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-US' },
    {
      provide: OptionsTokens.multiYear,
      useFactory: () =>
        ({
          yearRows: 5,
          yearsPerRow: 3,
        }) as Options['multiYear'],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
