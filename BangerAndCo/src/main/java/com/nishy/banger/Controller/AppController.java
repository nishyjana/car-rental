package com.nishy.banger.Controller;

import com.nishy.banger.Entity.Booking;
import com.nishy.banger.Entity.Customers;
import com.nishy.banger.Entity.car;
import com.nishy.banger.Repo.BookingRepo;
import com.nishy.banger.Repo.CarRepo;
import com.nishy.banger.Repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*",methods = {RequestMethod.POST,RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE})
public class AppController {

    @Autowired
    CarRepo carRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    BookingRepo bookingRepo;


    @GetMapping(path="/cars")
    public List<car> getAllCars(){
        return carRepo.findAll();
    }

    @PostMapping(path="/cars")
    public car addCar(@RequestBody car cars){
        carRepo.save(cars);
        return cars;
    }
    @GetMapping(path="/bookings")
    public List<Booking> getAllBookings(){
        return bookingRepo.findAll();
    }

    @PostMapping(path="/bookings")
    public Booking addBooking(@RequestBody Booking booking){
         bookingRepo.save(booking);
        return booking;
    }
    @GetMapping(path="/customers")
    public List<Customers> getAllCustomers(){
        return customerRepo.findAll();
    }

    @PostMapping(path="/customers")
    public Customers addCustomer(@RequestBody Customers customers){
        customerRepo.save(customers);
        return customers;
    }


    @PutMapping("/cars/{id}")
    @ResponseStatus( HttpStatus.OK)
    public car updateCar(@RequestBody car cars, @PathVariable("id") int id) {

        return carRepo.findById(id)
                .map(bookss -> {
                    bookss.setCarModel(cars.getCarModel());
                    bookss.setCarNumber(cars.getCarNumber());
                    bookss.setCarType(cars.getCarType());
                    bookss.setFuel(cars.getFuel());
                    bookss.setPrice(cars.getPrice());
                    return carRepo.save(bookss);
                })
                .orElseGet(() -> {
                    cars.setCarID(id);
                    return carRepo.save(cars);
                });
    }

    @DeleteMapping("/cars/{id}")
    @ResponseStatus( HttpStatus.OK)
    public void deleteCar(@PathVariable("id") int id)

    {
        carRepo.deleteById(id);
    }




}
