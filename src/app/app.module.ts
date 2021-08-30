import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientViewComponent } from './views/client-view/client-view.component';
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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
