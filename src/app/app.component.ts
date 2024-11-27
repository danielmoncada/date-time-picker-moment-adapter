import { Component, ViewChild } from '@angular/core';

import { Moment } from 'moment';
import { default as moment } from 'moment-timezone';

import { OwlDateTimeComponent } from '@danielmoncada/angular-datetime-picker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
})
export class AppComponent {
    @ViewChild('date_range_component', { static: true })
    date_range_component: OwlDateTimeComponent<AppComponent>;
    protected selectedMoments: Array<Moment> = [
        moment().subtract(3, 'days').tz('Europe/Berlin'),
        moment().tz('Europe/Berlin'),
    ];

    currentValue: Moment = this.selectedMoments[0];
    endValue: Moment = this.selectedMoments[1];

    selectedTrigger(_date: Moment) {
        console.log(_date);
    }
}
