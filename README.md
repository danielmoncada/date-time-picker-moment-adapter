Angular Date Time Picker (MomentJs Adapter)
========================

[![npm](https://img.shields.io/npm/v/@danielmoncada/angular-datetime-picker-moment-adapter.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker-moment-adapter)
[![npm](https://img.shields.io/npm/dm/@danielmoncada/angular-datetime-picker-moment-adapter.svg)](https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker-moment-adapter)

**Angular date time picker - MomentJs Adpater**

**This package supports Angular 9/10/11/12/13/14 **

Breaking Changes
-------
- Version 2.x.x no longer supports <= ng 13. If you need View Engine support, stick with version 1.x.x.

Description
-------
This is a MomentJs adapter to be used with the following date time picker control:

https://github.com/danielmoncada/date-time-picker

How to Use
-------

 1. Install with [npm](https://www.npmjs.com):`npm install @danielmoncada/angular-datetime-picker-moment-adapter --save`
 2. 
    ```typescript
    import { NgModule } from '@angular/core';
    import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS} from '@danielmoncada/angular-datetime-picker;
    import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';

    // See the Moment.js docs for the meaning of these formats:
    // https://momentjs.com/docs/#/displaying/format/
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
        imports: [OwlDateTimeModule, OwlMomentDateTimeModule],
        providers: [
            {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        ],
    })
    export class AppExampleModule {
    }
    ```

Dependencies
-------
- moment
- @danielmoncada/angular-datetime-picker
- tslib

Demo
-------
- Online doc is [here](https://daniel-projects.firebaseapp.com/owlng/date-time-picker) and [here](https://danielykpan.github.io/date-time-picker/)
- Online demos (StackBlitz) are [here](https://stackblitz.com/edit/angular-vvp849) and [here](https://stackblitz.com/edit/angular-i7ykf5)

License
-------
* License: MIT

Author
-------
**Maintained and updated by Daniel Moncada, original implementatiom by Daniel Pan**
