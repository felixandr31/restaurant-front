import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from 'src/app/services/data/role.service';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/restaurant.service';


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
  public itemToRemove = '';
  public bill = [];

  private roles = [];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private restaurantService: RestaurantService
    ) { }


  ngOnInit() {
    // let response: any;
    // let errorMessage: any;
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

    this.userService.getUsers().subscribe(
      data => {
        console.log('données', data)
        console.log('headers', data.headers)
        console.log('url', data.url)
      },
      err => {
        console.log('erreur', err)
      }
    )

    this.restaurantService.getRestaurants().subscribe(
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
    this.addToBill(event);
    this.bill = this.bill.slice(0)
    console.log('la facture après slice', this.bill)
  }

  itemRemoved(event) {
    this.removeFromBill(event);
    this.bill = this.bill.slice(0)
    console.log('la facture après slice', this.bill)
  }

  addToBill(item) {
    if (this.bill.length < 1) {
      this.bill.push({ name: item, quantity: 1 })
    } else {
      this.bill.find(line => line.name === item) ?
        this.bill.filter(line => line.name === item).map(line => line.quantity += 1) :
        this.bill.push({ name: item, quantity: 1 });
    }
  }

  removeFromBill(item) {
    if (this.bill.length < 1
      || !this.bill.find(it => it.name === item)
      || this.bill.find(it => it.name === item && it.quantity < 1)) {
      return;
    } else {
      this.bill.filter(line => line.name === item).map(line => line.quantity -= 1)
    }
  }
}
