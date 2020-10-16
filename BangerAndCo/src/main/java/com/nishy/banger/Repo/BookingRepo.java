package com.nishy.banger.Repo;

import com.nishy.banger.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepo extends JpaRepository
        <Booking,Integer> {
}
