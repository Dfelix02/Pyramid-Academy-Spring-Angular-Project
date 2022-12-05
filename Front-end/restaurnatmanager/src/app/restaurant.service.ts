import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Restaurant } from './restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }
  private apiServiceUrl = environment.apiBaseUrl;
  
  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiServiceUrl}/restaurant/all`);
  }

  public addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiServiceUrl}/restaurant/add`,restaurant);
  }

  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiServiceUrl}/restaurant/update`,restaurant);
  }

  public deleteRestaurant(restaurantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/restaurant/delete/${restaurantId}`);
  }
    
  
}
