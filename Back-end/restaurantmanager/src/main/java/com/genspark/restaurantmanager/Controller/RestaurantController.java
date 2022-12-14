package com.genspark.restaurantmanager.Controller;

import com.genspark.restaurantmanager.Model.Restaurant;
import com.genspark.restaurantmanager.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(){
        List<Restaurant> restaurants = restaurantService.findAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable("id") Long id){
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant){
        Restaurant newRestaurant = restaurantService.addRestaurant(restaurant);
        return new ResponseEntity<>(newRestaurant,HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody Restaurant restaurant){
        Restaurant updateRestaurant = restaurantService.updateRestaurant(restaurant);
        return new ResponseEntity<>(updateRestaurant,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable("id") Long id){
        restaurantService.deleteRestaurant(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
