import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/data/booking.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { TableService } from 'src/app/services/data/table.service';

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.css']
})
export class TableformComponent implements OnInit {
  @Output() refreshTablesAfterSubmit = new EventEmitter()
  @Input() restaurantId;
  isDisplayTable = false;
  public tables: any
  dynamicForm: FormGroup;
  submitted: boolean = false;
  restaurant: any;

  emptyTable: any = {
    name: "",
    capacity: ""
  }

  groupValidator = {
    name: ['', Validators.required],
    capacity: ['', Validators.required]
  }

  constructor(private bookingService: BookingService, private tableService: TableService, private formBuilder: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.dynamicForm = this.formBuilder.group(this.groupValidator)
 
    // this.restaurantService.getRestaurantById(this.restaurantId).subscribe(
    //   data => {
    //     console.log("datas", data)

    //   },
    //   err => {
    //     console.log('erreur', err)
    //   }
    // )

  }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    let newTable = {
      ...this.emptyTable,
      name: this.dynamicForm.controls.name.value,
      capacity: parseInt(this.dynamicForm.controls.capacity.value)
    }

    this.tableService.createTable(newTable).subscribe(
      data => {
        newTable = data.body;
        const tabId: String[] = [newTable.id];
        this.restaurantService.addTableToRestaurant(this.restaurantId, tabId).subscribe(
          data => {
            console.log(data);
            this.refreshTablesAfterSubmit.emit();
            this.dynamicForm.reset
            this.isDisplayTable= false
          },
          err => {
            console.log('erreur', err)
          }
        )
      }

    )
  }
  isDisplay(){
     this.isDisplayTable = !this.isDisplayTable    
  }


  showtableBookink(){

    const queries = this.tables.map(table => this.bookingService.getBookingByTable(table.id))

  }





}