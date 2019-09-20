import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantsComponent } from '../restaurants/restaurants.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  restaurant: any; restaurants: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router, private parent:RestaurantsComponent) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.restaurant = this.getRestaurant(params['id']);
      console.log(this.restaurant)
    })
  }

  getRestaurant(id){
    this._httpService.getRestaurant(id).subscribe(data => {
      console.log(data)
      this.restaurant = data['restaurant']
    })
  }

  updateRestaurant(id){
    console.log("testing");
    this._httpService.updateRestaurant(id, this.restaurant).subscribe(data => {
      this.parent.getAllRestaurants();
      this._router.navigate(['/']);
    })
  }


}
