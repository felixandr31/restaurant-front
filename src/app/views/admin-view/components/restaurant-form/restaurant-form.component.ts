import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() onRestaurantUpdate = new EventEmitter();

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
  public coordinatesForm: FormGroup;
  public editionMode = false;
  public creationMode = false;
  public relocateMode = false;
  public displayForm = false;
  deletionConfirmation = false;

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService) { }

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
    })
    this.coordinatesForm = this.formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    })
  }

  toggleRestaurantEdition() {
    this.resetModes()
    this.displayForm = true
    this.editionMode = true
    this.restaurantForm.patchValue(this.restaurant)
  }

  toggleRestaurantRelocate() {
    this.resetModes()
    this.displayForm = true
    this.relocateMode = true
    this.addressForm.patchValue(this.restaurant.address)
    this.coordinatesForm.patchValue(this.restaurant.coordinates)
  }

  initRestaurantCreation() {
    this.resetModes()
    this.displayForm = true
    this.creationMode = true
    this.resetSelectedRestaurant()
    this.restaurantForm.patchValue(this.restaurant)
    this.addressForm.patchValue(this.restaurant)
    this.coordinatesForm.patchValue(this.restaurant)
  }

  resetSelectedRestaurant() {
    this.restaurant = { ...this.defaultRestaurantFormValues }
  }

  onSubmit() {
    if (this.editionMode) {
      this.updateRestaurant()
    }
    if (this.relocateMode) {
      this.relocateRestaurant()
    }
    if (this.creationMode) {
      this.createRestaurant()
    }
  }

  updateRestaurant() {
    let restaurantToUpdate = { ...this.restaurant }
    for (const key in this.restaurantForm.value) {
      restaurantToUpdate[key] = this.restaurantForm.value[key]
    }
    console.log(restaurantToUpdate)
    this.restaurantService.updateRestaurant(restaurantToUpdate.id, restaurantToUpdate).subscribe(
      data => {
        console.log(data.body)
        this.onRestaurantUpdate.emit()
      }
    )
    this.resetModes()
  }

  relocateRestaurant() {
    let restaurantToRelocate = { ...this.restaurant }
    restaurantToRelocate.address = {...this.addressForm.value}
    restaurantToRelocate.coordinates = {...this.coordinatesForm.value}
    console.log(restaurantToRelocate)
    this.restaurantService.updateRestaurant(restaurantToRelocate.id, restaurantToRelocate).subscribe(
      data => {
        console.log(data.body)
        this.onRestaurantUpdate.emit()
      }
    )
    this.resetModes()
  }

  createRestaurant() {
    console.log('creation')
    console.log(this.restaurantForm.value)
    console.log(this.addressForm.value)
    console.log(this.coordinatesForm.value)
    // this.displayForm = false
  }

  resetModes() {
    this.displayForm = false
    this.editionMode = false
    this.creationMode = false
    this.relocateMode = false
  }

  cancelForm() {
    this.resetModes()
  }

  restaurantDeletionMode() {
    this.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    const restaurantToDelete: any = { ...this.restaurant }
    const options = {
      body:
        [restaurantToDelete.id]
      ,
    };
    if (event.target.value === "confirmDeletion") {
      // for each restaurant.employees => update restaurantId(slice(findindex))

      this.restaurantService.removeRestaurant(restaurantToDelete.id).subscribe(
        data => {
          this.onRestaurantUpdate.emit()
        }
      )
    }
    this.deletionConfirmation = false
    this.cancelForm();
  }



}
