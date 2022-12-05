package com.genspark.restaurantmanager.Repository;

import com.genspark.restaurantmanager.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
    void deleteRestaurantById(Long id);

    Optional<Restaurant> findRestaurantById(Long id);
}
