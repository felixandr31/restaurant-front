import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { UserService } from 'src/app/services/data/user.service';


@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit, OnChanges {

  @Input() restaurant: any;
  @Input() triggerCreation: any;
  @Output() onRestaurantUpdate = new EventEmitter();

  public restaurantTemplate = {
    stars: '0',
    employees: [],
    purchases: [],
    recipes: [],
    stocks: [],
    tables: [],
  }

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

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService, private userService: UserService) { }

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
      this.updateSelectedRestaurant()
    }
    if (this.relocateMode) {
      this.relocateRestaurant()
    }
    if (this.creationMode) {
      this.createRestaurant()
    }
  }

  updateSelectedRestaurant() {
    let restaurantToUpdate = { ...this.restaurant }
    for (const key in this.restaurantForm.value) {
      restaurantToUpdate[key] = this.restaurantForm.value[key]
    }
    this.updateRestaurant(restaurantToUpdate)
    this.resetModes()
  }

  relocateRestaurant() {
    let restaurantToRelocate = { ...this.restaurant }
    restaurantToRelocate.address = { ...this.addressForm.value }
    restaurantToRelocate.coordinates = { ...this.coordinatesForm.value }
    this.updateRestaurant(restaurantToRelocate)
    this.resetModes()
  }

  updateRestaurant(restaurant) {
    this.restaurantService.updateRestaurant(restaurant.id, restaurant).subscribe(
      data => {
        this.onRestaurantUpdate.emit()
      }
    )
  }


  createRestaurant() {
    let newRestaurant: any = { ...this.restaurantTemplate }
    for (const key in this.restaurantForm.value) {
      newRestaurant[key] = this.restaurantForm.value[key]
    }
    newRestaurant.address = { ...this.addressForm.value }
    newRestaurant.coordinates = { ...this.coordinatesForm.value }
    this.restaurantService.postRestaurant(newRestaurant).subscribe(
      data => {
        this.onRestaurantUpdate.emit()
      }
    )
    this.resetModes()
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
      // update employees
      // if (this.restaurant.employees.length > 0) {
      //   this.restaurant.employees.forEach(employee => {
      //     employee.restaurantId.slice(employee.restaurantId.indexOf(this.restaurant.id))
      //     this.userService.updateUser(employee.id, employee).subscribe()
      //   });
      // }
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
