import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.component.html',
  styleUrls: ['./newreview.component.css']
})
export class NewreviewComponent implements OnInit {
  err: any; review: any; restaurant: any; restaurantID: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.restaurant = this.getRestaurant(params['id']);
      this.restaurantID = params['id']
    })
    this.review = {name: "", rating:5, comment:""}
    this.err= {name:"", rating:"", comment:""}
  }

  getRestaurant(id){
    this._httpService.getRestaurant(id).subscribe(data => {
      console.log(data)
      this.restaurant = data['restaurant']
    })
  }

  createReview(){
    this.err = {};
    console.log(this.review, this.restaurantID)
    this._httpService.createReview(this.review, this.restaurantID).subscribe(data => {
      console.log(data)
      if(data['Message'] === "Error"){
        if(data['err']['errors']['name']){
          this.err['name'] = data['err']['errors']['name']['message'];
        }
        if(data['err']['errors']['rating']){
          this.err['rating'] = data['err']['errors']['rating']['message'];
        }
        if(data['err']['errors']['comment']){
          this.err['comment'] = data['err']['errors']['comment']['message'];
        }
      }
      else {
        this._router.navigate(['/restaurants', this.restaurantID, 'reviews' ]);
      }
    })
  }

}
