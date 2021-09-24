import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts'
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { UserFinderComponent } from './views/client-view/user-finder/user-finder.component';
import { FriendCardComponent } from './views/client-view/friend-card/friend-card.component';
import { FriendAddCardComponent } from './views/client-view/friend-add-card/friend-add-card.component';
import { RecipeformComponent } from './views/cook-view/recipeform/recipeform.component';
import { SetrecipeformComponent } from './views/cook-view/setrecipeform/setrecipeform.component';
import { ReservationListComponent } from './views/client-view/reservation-list/reservation-list.component';
import { ChooseMenuItemComponent } from './views/client-view/choose-menu-item/choose-menu-item.component';
import { ChooseMenuComponent } from './views/client-view/choose-menu/choose-menu.component';
import { OrderDisplayComponent } from './views/client-view/order-display/order-display.component';
import { EmployeesListComponent } from './views/manager-view/employees-list/employees-list.component';
import { EmployeesFormComponent } from './views/manager-view/employees-form/employees-form.component';
import { GuestViewComponent } from './views/guest-view/guest-view/guest-view.component';
import { DateSelectorComponent } from './views/client-view/date-selector/date-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestaurantsListComponent } from './views/admin-view/components/restaurants-list/restaurants-list.component';
import { HorizontalMenuComponent } from './views/admin-view/components/horizontal-menu/horizontal-menu.component';
import { StocksComponent } from './views/manager-view/stocks/stocks.component';
import { TableformComponent } from './views/waiter-view/tableform/tableform.component';
import { BookformComponent } from './views/waiter-view/bookform/bookform.component';
import { IngredientListComponent } from './views/manager-view/ingredient-list/ingredient-list.component';

import { SelectBookingComponent } from './views/waiter-view/select-booking/select-booking.component';
import { SalesGraphComponent } from './views/admin-view/components/sales-graph/sales-graph.component';
import { RecipePieComponent } from './views/admin-view/components/sales-graph/recipe-pie/recipe-pie.component';
import { PayingTabComponent } from './views/client-view/paying-tab/paying-tab.component';
import { CommentTabComponent } from './views/client-view/comment-tab/comment-tab.component';
import { OrderStatusComponent } from './views/waiter-view/order-status/order-status.component';
import { RecipesComponent } from './views/manager-view/recipes/recipes.component';




@NgModule({
  declarations: [
    AppComponent,
    OrderStatusComponent,
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
    EmployeesListComponent,
    EmployeesFormComponent,
    ReservationListComponent,
    ChooseMenuItemComponent,
    ChooseMenuComponent,
    OrderDisplayComponent,
    GuestViewComponent,
    DateSelectorComponent,
    RestaurantsListComponent,
    HorizontalMenuComponent,
    StocksComponent,
    TableformComponent,
    BookformComponent,
    RecipesComponent,
    
    IngredientListComponent,
    SelectBookingComponent,
    SalesGraphComponent,
    RecipePieComponent,
    PayingTabComponent,
    CommentTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxChartsModule
  ],
  providers: [
    MarkerService,
    PopupService,
    [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
