import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  @Output() onDateSelection = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('fr-FR')
    }

  form: FormGroup;

  public hours = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ]

  ngOnInit() {
    this.form = this.formBuilder.group({
      day: [new Date(), Validators.required],
      hour: ['', Validators.required]
    })
  }

  dateSelected() {

    if (!this.form.value.hour) {
      alert('Please choose an hour')
      return
    } else {
      const date : Date = this.form.value.day
      const day = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

      let dayTime = {
        day: day,
        hour: this.form.value.hour
      }

      console.log('date selector event', dayTime)
      this.onDateSelection.emit(dayTime)
    }
  }
}
