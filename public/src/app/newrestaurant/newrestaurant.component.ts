import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newrestaurant',
  templateUrl: './newrestaurant.component.html',
  styleUrls: ['./newrestaurant.component.css']
})
export class NewrestaurantComponent implements OnInit {
  err: any; restaurant: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.restaurant = {name: "", cuisine:""}
    this.err = {name:"", cuisine:""}
  }

  createRestaurant(){
    this.err = {};
    this._httpService.createRestaurant(this.restaurant).subscribe(data => {
      console.log(data)
      if(data['Message'] === "Error"){
        if(data['err']['errors']['name']){
          this.err['name'] = data['err']['errors']['name']['message'];
        }
        if(data['err']['errors']['cuisine']){
          this.err['cuisine'] = data['err']['errors']['cuisine']['message'];
        }
      }
      else {
        this._router.navigate(['/restaurants']);
      }
    })
  }
}
