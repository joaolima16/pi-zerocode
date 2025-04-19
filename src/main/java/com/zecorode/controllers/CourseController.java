package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.zecorode.domain.course.Course;
import com.zecorode.domain.course.RegisterCourseDTO;
import com.zecorode.services.CourseService;
import java.util.List;
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;


    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = this.courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody RegisterCourseDTO registerCourseDTO) {
        this.courseService.createCourse(registerCourseDTO);
        return ResponseEntity.ok("Course created successfully!");
    }
}
