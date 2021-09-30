import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit, OnChanges {

  @Input() restaurant: any;
  @Input() triggerCreation: any;
  @Output() onRestaurantUpdate: any;

  public defaultRestaurantFormValues = {
    name: '',
    streetName: '',
    city: '',
    zipCode: '',
    country: '',
    latitude: Number,
    longitude: Number,
    stars: '0',
    employees: [],
    purchases: [],
    recipes: [],
    stocks: [],
    tables: [],
    budget: Number,
  };
  public restaurantForm: FormGroup;
  public addressForm: FormGroup;
  public editionMode = false;
  public creationMode = false
  public displayForm = false

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.createForms()
    if (this.triggerCreation) {
      this.initRestaurantCreation()
    }
    else {
      this.resetModes()
    }
  }

  createForms() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      budget: [Number, Validators.required],
    })
    this.addressForm = this.formBuilder.group({
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    })
  }

  toggleRestaurantEdition() {
    this.displayForm = true
    this.editionMode = true
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
    this.creationMode = true
    this.displayForm = true
    this.editionMode = false
    this.resetSelectedRestaurant()
    this.restaurantForm.patchValue(this.restaurant)
    this.addressForm.patchValue(this.restaurant)
  }

  updateRestaurant() {
    let restaurantToUpdate = {...this.restaurant}

    for(const key in this.restaurantForm.value) {
      restaurantToUpdate[key] = this.restaurantForm.value[key]
    }
    console.log(restaurantToUpdate)
    // this.restaurantService.
    // this.onRestaurantUpdate.emit()
    // this.editionMode = false
    // this.displayForm = false
  }

  createRestaurant() {
    console.log('creation')
    console.log(this.restaurantForm.value)
    console.log(this.addressForm.value)
    // this.displayForm = false
  }

  resetSelectedRestaurant() {
    this.restaurant = { ...this.defaultRestaurantFormValues }
  }

  resetModes() {
    this.displayForm = false
    this.editionMode = false
    this.creationMode = false
  }

  cancelForm() {
    this.resetModes()
  }

}
