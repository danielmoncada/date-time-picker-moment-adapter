import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    Options,
    OptionsTokens,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OWL_DATE_TIME_FORMATS,
    OWL_DATE_TIME_LOCALE
} from '@danielmoncada/angular-datetime-picker';

import { AppComponent } from './app.component';
import { OwlMomentDateTimeModule } from '../../projects/picker/src/public_api';

export const MY_MOMENT_FORMATS = {
    parseInput: 'l LT',
    fullPickerInput: 'l LT',
    datePickerInput: 'l',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
    ],
    providers: [
        { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-US' },
        {
            provide: OptionsTokens.multiYear,
            useFactory: () =>
                ({
                    yearRows: 5,
                    yearsPerRow: 3,
                } as Options['multiYear']),
        },
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
