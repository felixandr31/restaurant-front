import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { PopupService } from './services/popup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavigationMenuComponent } from './components/side-navigation-menu/side-navigation-menu.component';
import { ClientViewComponent } from './views/client-view/client-view.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantMapComponent } from './components/restaurant-map/restaurant-map.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ToTableReservationComponent } from './components/to-table-reservation/to-table-reservation.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { ManagerViewComponent } from './views/manager-view/manager-view.component';
import { CookViewComponent } from './views/cook-view/cook-view.component';
import { WaiterViewComponent } from './views/waiter-view/waiter-view.component';
import { ClientSelectorComponent } from './components/client-selector/client-selector.component';


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
    ClientSelectorComponent
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
