import { Component, OnInit } from '@angular/core';

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
      }
    },
    {
      name: "BFC",
      stars: 4,
      coordinates: {
        latitude: 43.58395,
        longitude: 1.40126
      }
    }
  ];
  public restaurant: any;

  constructor() { }

  ngOnInit() {
    console.log(this.restaurants);
  }

}
