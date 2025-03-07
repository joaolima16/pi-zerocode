package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.student.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
    
    Student findByEmail(String email);
}
