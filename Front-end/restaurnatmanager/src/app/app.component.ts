import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Restaurant } from "./restaurant";
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public restaurants: Restaurant[] | undefined;
  public editRestaurant: Restaurant | undefined;
  public deleteRestaurant: Restaurant | undefined;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
      this.getRestaurant();
  }

  public getRestaurant(): void{
    this.restaurantService.getRestaurants().subscribe(
      (response: Restaurant[]) => {
        this.restaurants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddRestaurant(addForm: NgForm): void {
    document.getElementById('add-restaurant-form')?.click();
    this.restaurantService.addRestaurant(addForm.value).subscribe(
      (response: Restaurant) => {
        this.getRestaurant();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }

    );
  }
  public onUpdateRestaurant(restaurant: Restaurant): void {
    this.restaurantService.updateRestaurant(restaurant).subscribe(
      (response: Restaurant) => {
        this.getRestaurant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }

    );
  }
  public onDeleteRestaurant(restaurantId: number): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      (response: void) => {
        this.getRestaurant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }

    );
  }

  // public searchRestaurants(key: string): void{
  //   const results: Restaurant[] = [];
  //   if (this.restaurants) {
  //     for(const restaurant of this.restaurants){
  //       if (restaurant.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 
  //       || restaurant.slogan.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
  //       || restaurant.address.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
  //       || restaurant.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
  //         results.push(restaurant)
  //       }
  //       this.restaurants = results;
  //       if (results.length === 0 || !key) {
  //         this.getRestaurant();
  //       }
  //     }
  //   }
    
  // }

  public onOpenModal(mode: string, restaurant?: Restaurant): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', "modal");
    if (mode ==='add') {
      button.setAttribute('data-target', "#addRestaurantModal");

    } 
    else if (mode ==='edit') {
      this.editRestaurant = restaurant;
      button.setAttribute('data-target', "#updateRestaurantModal");

    } 
    else if (mode ==='delete') {
      this.deleteRestaurant = restaurant;
      button.setAttribute('data-target', "#deleteRestaurantModal");

    } 
    container?.appendChild(button);
    button.click();
  }
}
