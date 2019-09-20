import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getRestaurants(){
    return this._http.get("/restaurants")
  }

  getReviews(){
    return this._http.get('/reviews')
  }

  createRestaurant(restaurant){
    console.log(restaurant)
    return this._http.post("/restaurants/new", restaurant)
  }

  getRestaurant(id){
    return this._http.get("/restaurants/"+id)
  }

  updateRestaurant(id, restaurant){
    return this._http.put('/restaurants/'+id+'/update', restaurant)
  }

  deleteRestaurant(id){
    return this._http.delete('/restaurants/'+id+'/delete')
  }

  createReview(review, id){
    console.log("inside service", '/restaurants/'+id+'/review', review )
    return this._http.post('/restaurants/'+id+'/review', review)
  }

  makeDeletable(id, restaurant){
    return this._http.put('/restaurants/'+id+'/makedeletable', restaurant)
  }
}
