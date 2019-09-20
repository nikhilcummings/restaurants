import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';
import { EditComponent } from './edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewreviewComponent } from './newreview/newreview.component';

const routes: Routes = [
  {path: 'restaurants',component: RestaurantsComponent, children: [
    {path: ':id/edit', component: EditComponent}
  ]},
  {path: 'newrestaurant',component: NewrestaurantComponent},
  {path: 'restaurants/:id/reviews', component: ReviewsComponent},
  {path: 'restaurants/:id/reviews/review', component: NewreviewComponent},
  {path:'', pathMatch: 'full', redirectTo: '/restaurants'},
  //{ path: '**', pathMatch: 'full', component: RestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
