import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/map/marker.service';
import { PopupService } from './services/map/popup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavigationMenuComponent } from './components/side-navigation-menu/side-navigation-menu.component';
import { ClientViewComponent } from './views/client-view/client-view.component';
import { RestaurantListComponent } from './views/client-view/restaurant-list/restaurant-list.component';
import { RestaurantMapComponent } from './views/client-view/restaurant-map/restaurant-map.component';
import { RestaurantMenuComponent } from './views/client-view/restaurant-menu/restaurant-menu.component';
import { RestaurantCardComponent } from './views/client-view/restaurant-card/restaurant-card.component';
import { MenuItemComponent } from './views/client-view/menu-item/menu-item.component';
import { ToTableReservationComponent } from './views/client-view/to-table-reservation/to-table-reservation.component';
import { ReservationFormComponent } from './views/client-view/reservation-form/reservation-form.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { ManagerViewComponent } from './views/manager-view/manager-view.component';
import { CookViewComponent } from './views/cook-view/cook-view.component';
import { WaiterViewComponent } from './views/waiter-view/waiter-view.component';
import { ClientSelectorComponent } from './views/client-view/client-selector/client-selector.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { FriendsListComponent } from './views/client-view/friends-list/friends-list.component';
import { UserFinderComponent } from './user-finder/user-finder.component';
import { FriendCardComponent } from './views/client-view/friend-card/friend-card.component';
import { FriendAddCardComponent } from './views/client-view/friend-add-card/friend-add-card.component';
import { RecipeformComponent } from './views/cook-view/recipeform/recipeform.component';
import { SetrecipeformComponent } from './views/cook-view/setrecipeform/setrecipeform.component';
import { ReservationListComponent } from './views/client-view/reservation-list/reservation-list.component';
import { ChooseMenuItemComponent } from './views/client-view/choose-menu-item/choose-menu-item.component';
import { ChooseMenuComponent } from './views/client-view/choose-menu/choose-menu.component';
import { OrderDisplayComponent } from './views/client-view/order-display/order-display.component';
import { EmployeesListComponent } from './views/manager-view/employees-list/employees-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavigationMenuComponent,
    ClientViewComponent,
    RestaurantListComponent,
    RestaurantMapComponent,
    RestaurantMenuComponent,
    RestaurantCardComponent,
    MenuItemComponent,
    ToTableReservationComponent,
    ReservationFormComponent,
    AdminViewComponent,
    ManagerViewComponent,
    CookViewComponent,
    WaiterViewComponent,
    ClientSelectorComponent,
    SubMenuComponent,
    FriendsListComponent,
    UserFinderComponent,
    FriendCardComponent,
    FriendAddCardComponent,
    RecipeformComponent,
    SetrecipeformComponent,
    ReservationListComponent,
    ChooseMenuItemComponent,
    ChooseMenuComponent,
    OrderDisplayComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MarkerService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
