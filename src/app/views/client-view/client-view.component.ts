import { Component, OnInit, SimpleChanges, Input, AfterViewChecked, DoCheck } from '@angular/core';
import { RoleService } from 'src/app/services/data/role.service';


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit, DoCheck {

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
        { name: "Yanza" }
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


  public restaurantReservation = {};

  public itemToAdd = '';
  public lastAddedItem = false;
  public itemToRemove = '';

  private roles = []

  constructor(private roleService: RoleService) { }


  ngOnInit() {
    let response: any;
    let errorMessage: any;
    // this.roleService.postRole({name: ''}).subscribe({
    //   next: data => {
    //     response = data.body
    //     console.log('post data :', data.body)
    //   },
    //   error: error => {
    //     errorMessage = error.errorMessage
    //     console.error('Une erreur sauvage : ', errorMessage)
    //   }
    // })

    this.roleService.getRoles().subscribe(
      data => {
        console.log('données', data)
        console.log('headers', data.headers)
        console.log('url', data.url)
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  ngDoCheck() {
    if (this.lastAddedItem) {
      this.itemToAdd = '';
      this.lastAddedItem = !this.lastAddedItem;
    }
  }

  restaurantSelected(event) {
    if (event.name) {
      this.restaurant = event;
    } else {
      this.restaurant = this.restaurants.find(restaurant => restaurant.name === event)
    }
  }

  reservationSelected(event) {
    this.restaurantReservation = this.restaurants.find(resto => resto.name == event)
    console.log('réservation :', this.restaurantReservation)
  }

  toggleReservationForm() {
    return this.displayReservationForm = !this.displayReservationForm;
  }

  itemAdded(event) {
    this.itemToAdd = event;
    console.log('item to add', this.itemToAdd)
  }

  itemAddedClear() {
    this.lastAddedItem = true;
  }

  itemRemoved(event) {
    this.itemToRemove = event
    console.log('item to remove', this.itemToRemove)
  }
}
