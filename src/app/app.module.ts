import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantMapComponent } from './restaurant-map/restaurant-map.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientViewComponent,
    RestaurantListComponent,
    RestaurantMapComponent,
    RestaurantMenuComponent,
    RestaurantCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
