import { Injectable } from '@angular/core';
import { Timespan } from '../timespans/timespanModel';

@Injectable({
  providedIn: 'root',
})
export class TimespansService {
  createEmptyTimespansItem() {
    const newTimespansArray: Timespan[] = [];
    localStorage.setItem('timespans', JSON.stringify(newTimespansArray));
  }

  // Read
  getTimespans(): Timespan[] {
    if (!localStorage.getItem('timespans')) {
      this.createEmptyTimespansItem()
    }

    const timespans: Timespan[] = JSON.parse(localStorage.getItem('timespans')!);
    return timespans;
  }

  // Create
  createTimespan(timespan: Timespan) {
    if(!localStorage.getItem('timespans')) {
      this.createEmptyTimespansItem();
    }

    let timespans: Timespan[] = this.getTimespans();
    timespans.push(timespan);
    localStorage.setItem('timespans', JSON.stringify(timespans));
  }
}
