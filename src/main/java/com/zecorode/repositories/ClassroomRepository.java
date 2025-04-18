package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.classroom.Classroom;

public interface ClassroomRepository extends JpaRepository<Classroom, Long>{
    
}
