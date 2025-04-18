package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.classBooking.ClassBooking;

public interface ClassBookingRepository extends JpaRepository<ClassBooking, Long> {

    
}
