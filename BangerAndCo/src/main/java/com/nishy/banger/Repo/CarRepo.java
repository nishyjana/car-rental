package com.nishy.banger.Repo;

import com.nishy.banger.Entity.car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepo extends JpaRepository
        <car,Integer> {
}
