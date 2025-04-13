package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.teacher.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    
}
