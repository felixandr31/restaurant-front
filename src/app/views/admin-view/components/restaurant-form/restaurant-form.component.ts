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
      latitude: Number,
      longitude: Number,
    },
    employees: [],
    purchases: [],
    recipes: [],
    stocks: [],
    tables: [],
    budget: Number,
  };
  public restaurantForm: FormGroup;
  public address: FormGroup;
  public editionMode = false;

  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    if (this.restaurant === 'triggerCreate') {
      this.initRestaurantCreation()
    }

  }

  ngOnChanges() {
  }

  createForms() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      budget: [Number, Validators.required],
      address: new FormGroup({
        // streetName : ['', Validators.required],
        // city : ['', Validators.required],
        // zipCode : ['', Validators.required],
        // country : ['', Validators.required],
      }),
      coordinates: new FormGroup({
        // latitude : ['', Validators.required],
        // longitude : ['', Validators.required],
      })
    })
  }

  toggleRestaurantEdition() {
    this.editionMode = true
    this.createForms()
    this.restaurantForm.patchValue(this.restaurant)
  }

  onSubmit() {
    if (this.editionMode) {
      this.updateRestaurant()
    } else {
      this.createRestaurant()
    }
  }

  initRestaurantCreation() {
    console.log('initRestaurantCreation')
    // create restaurant form
    // patch with empty values
  }

  updateRestaurant() {

    this.editionMode = false
  }

  createRestaurant() {

  }




}
