/**
 * moment-date-time-adapter.class
 */

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import _moment, { Moment } from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';

const moment = (_moment as unknown)['default'] ? (_moment as unknown)['default'] : _moment;

/** Configurable options for {@see MomentDateAdapter}. */
export interface OwlMomentDateTimeAdapterOptions {
  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how the DateTimePicker output value.
   * {@default false}
   */
  useUtc: boolean;

  /**
   * Turns the use of strict string parsing in moment.
   * Changing this will change how the DateTimePicker interprets input.
   * {@default false}
   */
  parseStrict: boolean;
}

/** InjectionToken for moment date adapter to configure options. */
export const OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken<OwlMomentDateTimeAdapterOptions>(
  'OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS',
  {
    providedIn: 'root',
    factory: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY,
  },
);

export function OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY(): OwlMomentDateTimeAdapterOptions {
  return {
    useUtc: false,
    parseStrict: false,
  };
}

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

@Injectable()
export class MomentDateTimeAdapter extends DateTimeAdapter<Moment> {
  public firstMonthOfTheYear: number = 0;
  public firstDayOfTheWeek: number = 0;

  private _localeData: {
    longMonths: string[];
    shortMonths: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
    dates: string[];
  };

  constructor(
    @Optional() @Inject(OWL_DATE_TIME_LOCALE) private owlDateTimeLocale: string,
    @Optional() @Inject(OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS) private options?: OwlMomentDateTimeAdapterOptions,
  ) {
    super();
    this.setLocale(owlDateTimeLocale || moment.locale());
  }

  get parseStrict() {
    return this.options && this.options.parseStrict;
  }

  public setLocale(locale: string) {
    super.setLocale(locale);

    const momentLocaleData = moment.localeData(locale);
    this._localeData = {
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      longDaysOfWeek: momentLocaleData.weekdays(true),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(true),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(true),
      dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
    };
  }

  public getYear(date: Moment): number {
    return this.clone(date).year();
  }

  public getMonth(date: Moment): number {
    return this.clone(date).month();
  }

  public getDay(date: Moment): number {
    return this.clone(date).day();
  }

  public getDate(date: Moment): number {
    return this.clone(date).date();
  }

  public getHours(date: Moment): number {
    return this.clone(date).hours();
  }

  public getMinutes(date: Moment): number {
    return this.clone(date).minutes();
  }

  public getSeconds(date: Moment): number {
    return this.clone(date).seconds();
  }

  public getTime(date: Moment): number {
    return this.clone(date).valueOf();
  }

  public getNumDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  public differenceInCalendarDays(dateLeft: Moment, dateRight: Moment): number {
    return this.clone(dateLeft).diff(dateRight, 'days');
  }

  public getYearName(date: Moment): string {
    return this.clone(date).format('YYYY');
  }

  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style === 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  public getDateNames(): string[] {
    return this._localeData.dates;
  }

  public toIso8601(date: Moment): string {
    return this.clone(date).format();
  }

  public isEqual(dateLeft: Moment, dateRight: Moment): boolean {
    if (dateLeft && dateRight) {
      return this.clone(dateLeft).isSame(this.clone(dateRight));
    }

    return dateLeft === dateRight;
  }

  public isSameDay(dateLeft: Moment, dateRight: Moment): boolean {
    if (dateLeft && dateRight) {
      return this.clone(dateLeft).isSame(this.clone(dateRight), 'day');
    }

    return dateLeft === dateRight;
  }

  public isValid(date: Moment): boolean {
    return this.clone(date).isValid();
  }

  public invalid(): Moment {
    return moment.invalid();
  }

  public isDateInstance(obj: unknown): boolean {
    return moment.isMoment(obj);
  }

  public addCalendarYears(date: Moment, amount: number): Moment {
    return this.clone(date).add({ years: amount });
  }

  public addCalendarMonths(date: Moment, amount: number): Moment {
    return this.clone(date).add({ months: amount });
  }

  public addCalendarDays(date: Moment, amount: number): Moment {
    return this.clone(date).add({ days: amount });
  }

  public setHours(date: Moment, amount: number): Moment {
    return this.clone(date).hours(amount);
  }

  public setMinutes(date: Moment, amount: number): Moment {
    return this.clone(date).minutes(amount);
  }

  public setSeconds(date: Moment, amount: number): Moment {
    return this.clone(date).seconds(amount);
  }

  public createDate(year: number, month: number, date: number): Moment;

  public createDate(year: number, month: number, date: number, hours = 0, minutes = 0, seconds = 0): Moment {
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    if (hours < 0 || hours > 23) {
      throw Error(`Invalid hours "${hours}". Hours has to be between 0 and 23.`);
    }

    if (minutes < 0 || minutes > 59) {
      throw Error(`Invalid minutes "${minutes}". Minutes has to between 0 and 59.`);
    }

    if (seconds < 0 || seconds > 59) {
      throw Error(`Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`);
    }

    const result = this.createMoment({ year, month, date, hours, minutes, seconds }).locale(this.getLocale());

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  public clone(date: Moment): Moment {
    return this.createMoment(date).clone().locale(this.getLocale());
  }

  public now(): Moment {
    return this.createMoment().locale(this.getLocale());
  }

  public format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentDateTimeAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  public parse(value: unknown, parseFormat: unknown): Moment | null {
    if (value && typeof value === 'string') {
      return this.createMoment(value, parseFormat, this.getLocale(), this.parseStrict);
    }
    return value ? this.createMoment(value).locale(this.getLocale()) : null;
  }

  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */
  deserialize(value: unknown): Moment | null {
    let date: _moment.Moment;

    if (value instanceof Date) {
      date = this.createMoment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this.createMoment(value, moment.ISO_8601, this.parseStrict).locale(this.getLocale());
    }
    if (date && this.isValid(date)) {
      return date;
    }

    return super.deserialize(value);
  }

  /** Creates a Moment instance while respecting the current UTC settings. */
  private createMoment(...args: unknown[]): Moment {
    return this.options && this.options.useUtc ? moment.utc(...args) : moment(...args);
  }
}
