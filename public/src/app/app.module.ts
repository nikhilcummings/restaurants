import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewreviewComponent } from './newreview/newreview.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    NewrestaurantComponent,
    EditComponent,
    ReviewsComponent,
    NewreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
