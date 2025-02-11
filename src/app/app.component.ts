import { Component, ViewChild } from '@angular/core';
import moment from 'moment-timezone';

import { OwlDateTimeComponent, OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, JsonPipe, OwlDateTimeModule],
  standalone: true
})
export class AppComponent {
  @ViewChild('date_range_component', { static: true })
  date_range_component: OwlDateTimeComponent<AppComponent>;
  private readonly now: Moment = moment().tz('Europe/Amsterdam');
  readonly endAtValue: Date = moment(this.now).endOf('day').second(0).millisecond(0).toDate();
  readonly startAtValue: Date = moment(this.now).startOf('day').subtract(3, 'days').toDate();
  selectedMoments: Date[] = [this.startAtValue, this.endAtValue];

  selectedTrigger(_date: Date) {
    console.log(_date);
  }
}
