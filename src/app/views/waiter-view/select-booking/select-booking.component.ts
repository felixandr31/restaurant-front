import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-select-booking',
  templateUrl: './select-booking.component.html',
  styleUrls: ['./select-booking.component.css']
})
export class SelectBookingComponent implements OnInit {

  @Output() onDateSelection = new EventEmitter();
  public isSelectedDate = false;
  public defaultSelectedDate: any
  

 
  
  



  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr-FR')
  }

  form: FormGroup

  ngOnInit() {
    this.form = this.formBuilder.group({
      day: [new Date(), Validators.required],
    })
  }





  dateSelected() {
    const date: Date = this.form.value.day
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
    const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
    const dayOfVenue = `${year}-${month}-${day}`

    let dayTime = {
      day: dayOfVenue,

    }
    console.log('date selector event', dayTime)
    
    this.onDateSelection.emit(dayTime)
  }


}
