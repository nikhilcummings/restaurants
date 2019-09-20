import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurant: any; reviews: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    console.log(this._route.params['id'])
    this._route.params.subscribe((params: Params) => {
      this.restaurant = this.getRestaurant(params['id']);
    })
  }

  getRestaurant(id){
    this._httpService.getRestaurant(id).subscribe(data => {
      console.log(data)
      this.restaurant = data['restaurant']
      this.reviews = this.restaurant.reviews;
      this.reviews = this.reviews.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
    })
  }

  // getAllReviews(){
  //   let tempObservable = this._httpService.getReviews();
  //   tempObservable.subscribe(data => {
  //     console.log("Got our Reviews!", data),
  //     this.reviews = data['reviews'];
  //   });
  // }

}
