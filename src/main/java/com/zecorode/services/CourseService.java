package com.zecorode.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zecorode.domain.course.Course;
import com.zecorode.domain.course.RegisterCourseDTO;
import com.zecorode.repositories.CourseRepository;
import com.zecorode.repositories.TeacherRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherRepository teacherRepository;


    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public void createCourse(RegisterCourseDTO registerCourseDTO) {

        Course course = new Course();
        
        course.setName(registerCourseDTO.name());
        course.setDescription(registerCourseDTO.description());

        teacherRepository.findById(registerCourseDTO.teacherId()).ifPresent(course::setTeacher);
        courseRepository.save(course);
    }
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }
}
