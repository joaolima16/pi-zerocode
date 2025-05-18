package com.zecorode.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zecorode.domain.course.Course;
import com.zecorode.domain.course.RegisterCourseDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.repositories.CourseRepository;
import com.zecorode.repositories.StudentRepository;
import com.zecorode.repositories.TeacherRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public void createCourse(RegisterCourseDTO registerCourseDTO) {

        Course course = new Course();
        
        course.setName(registerCourseDTO.name());
        course.setDescription(registerCourseDTO.description());
        course.setPrice(registerCourseDTO.price());

        teacherRepository.findById(registerCourseDTO.teacherId()).ifPresent(course::setTeacher);
        courseRepository.save(course);
    }
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }
    public void purchaseCourse(Long studentId, Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        Student student = studentRepository.findById(studentId).orElse(null);
       if(student.getPurchasedCourses().contains(course)){
            throw new IllegalArgumentException("Course already purchased");
        }else{
            student.getPurchasedCourses().add(course);
            studentRepository.save(student);
        }
       }
    }

