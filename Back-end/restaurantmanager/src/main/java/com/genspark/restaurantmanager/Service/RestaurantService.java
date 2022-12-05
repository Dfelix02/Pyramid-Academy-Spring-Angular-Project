package com.genspark.restaurantmanager.Service;

import com.genspark.restaurantmanager.Exceptions.RestaurantNotFoundException;
import com.genspark.restaurantmanager.Model.Restaurant;
import com.genspark.restaurantmanager.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> findAllRestaurants(){
        return restaurantRepository.findAll();
    }

    public Restaurant updateRestaurant (Restaurant restaurant){
        return restaurantRepository.save(restaurant);
    }

    public Restaurant findRestaurantById(Long id){
        return restaurantRepository.findRestaurantById(id)
                .orElseThrow(()-> new RestaurantNotFoundException("Restaurant by id "+id+" not found"));
    }

    public void deleteRestaurant(Long id){
        restaurantRepository.deleteById(id);
    }


    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
}
