import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit, OnChanges {

  @Input() restaurant: any;

  public defaultFormValues = {
    name: '',
    address: {
      streetName: '',
      city: '',
      zipCode: '',
      country: '',
    },
    stars: '0',
    coordinates: {
      latitude: Float64Array
    },
    employees: [],
    purchases: [],
    recipes: [],
    stocks: [],
    tables: [],
    budget: Number,
  };
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log('restaurant: ', this.restaurant)
  }

  createForms() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],

    })
  }

}
