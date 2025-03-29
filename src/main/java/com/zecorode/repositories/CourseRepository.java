package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.course.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    
}
