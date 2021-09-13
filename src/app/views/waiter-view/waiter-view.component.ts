import { Component, Input, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/data/table.service';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit {

public tables : any

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.showTables()
  }

  showTables(){
    this.tableService.getTables().subscribe(
      data => {
        console.log(data.body)
        this.tables = data.body

      },
      err =>{
        console.log(err)
      }

     
    )
    
  }

  onsubmit(){

  }
}


