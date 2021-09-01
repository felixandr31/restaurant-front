import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  @Input() showSubView: any;

  public restaurants: any = [
    {
      name: "Zozan",
      stars: 5,
      coordinates: {
        latitude: 43.58516,
        longitude: 1.40005
      },
      recipes: [
        { name: "Ultimate Kebab" },
        { name: "Ultimate Tacos" }
      ]
    },
    {
      name: "BFC",
      stars: 4,
      coordinates: {
        latitude: 43.58395,
        longitude: 1.40126
      },
      recipes: [
        { name: "BFC Tenders" },
        { name: "BFC Wings" }
      ]
    }
  ];

  public restaurant: any =
    {
      name: "", stars: 0,
      coordinates: {},
      recipes: []
    };

  public client: any = {
    name: "Georges",
    roles: [
      { name: "client" }
    ],
    friends: [
      { name: "Alain" },
      { name: "Elsa" }
    ]
  }

  public users: any = [
    {
      name: "Georges",
      roles: [
        { name: "client" }
      ],
      friends: [
        { name: "Alain" },
        { name: "Elsa" }
      ]
    }, {

      name: "Alain",
      roles: [
        { name: "client" }
      ],
      friends: [
        { name: "Georges" }
      ]
    }, {
      name: "Sandrine",
      roles: [
        { name: "client" }
      ],
      friends: [
        { name: "Yanza"}
      ]
    }, {
      name: "Elsa",
      roles: [
        { name: "waiter" },
        { name: "client" }
      ],
      friends: [
        { name: "Georges" }
      ]
    }, {
      name: "Yanza",
      roles: [
        { name: "cook" },
        { name: "client" }
      ],
      friends: [
        { name: "Sandrine" }
      ]
    }
  ]

  public displayReservationForm = false;

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
  }

  toggleReservationForm() {
    return this.displayReservationForm = !this.displayReservationForm;
  }
}
