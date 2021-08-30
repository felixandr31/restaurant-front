import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientViewComponent } from './view/client-view/client-view.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantMapComponent } from './components/restaurant-map/restaurant-map.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';

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
