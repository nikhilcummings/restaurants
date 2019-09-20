import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any; updating: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(){
    this.getAllRestaurants();
  }
  getAllRestaurants(){
    let tempObservable = this._httpService.getRestaurants();
    tempObservable.subscribe(data => {
      console.log("Got our Restaurants!", data),
      this.restaurants = data['restaurants'];
      for(let i=0; i<this.restaurants.length;i++){
        if(this.restaurants[i].canDelete == false){
          setTimeout(() => this.makeDeletable(this.restaurants[i]._id, this.restaurants[i]), 30000);
        }
      }
    });
  }

  deleteRestaurant(id){
    this._httpService.deleteRestaurant(id).subscribe(data => {
      console.log(data);
    })
    let tempObservable = this._httpService.getRestaurants();
    tempObservable.subscribe(data => {
      console.log("Got our restaurants!", data),
      this.restaurants = data['restaurants'];
    });
  }

  makeDeletable(id, restaurant){
    this._httpService.makeDeletable(id, restaurant).subscribe(data => {
      console.log("deletable")
      this.getAllRestaurants();
    })
  }
}
