import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recipe-pie',
  templateUrl: './recipe-pie.component.html',
  styleUrls: ['./recipe-pie.component.css']
})
export class RecipePieComponent implements OnInit, OnChanges {

  @Input() recipesSales: any;

  public data: any = [];

  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }


  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
      this.recipesSales.map(element => {
        this.data.push({name: element.name, value: element.sellingPrice * element.quantity})
        console.log('sales in change chart', this.recipesSales)
    })
    this.data = [...this.data]
    console.log('data', this.data)

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
