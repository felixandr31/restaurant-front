import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  // la liste de restaurants et le restau potentiellement sélectionné
  public restaurants: any = [
    {
      name: "Zozan",
      stars: 5,
      coordinates: {
        latitude: 43.58516,
        longitude: 1.40005
      },
      recipes:  [
        {name: "Ultimate Kebab"},
        {name: "Ultimate Tacos"}
      ]
    },
    {
      name: "BFC",
      stars: 4,
      coordinates: {
        latitude: 43.58395,
        longitude: 1.40126
      },
      recipes:  [
        {name: "BFC Tenders"},
        {name: "BFC Wings"}
      ]
    }
  ];
  public restaurant: any =
  {
    name: "", stars: 0,
    coordinates: {},
    recipes:  []
  };

  constructor() { }

  ngOnInit() {
    console.log(this.restaurants);
  }

  restaurantSelected(event) {
    if (event.name) {
      this.restaurant = event;
    } else {
      this.restaurant = this.restaurants.find(restaurant => restaurant.name === event)
    }
    console.log('resto choisi', this.restaurant)
  }
}
