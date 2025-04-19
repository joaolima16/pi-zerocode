package com.zecorode.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zecorode.domain.classroom.Classroom;
import com.zecorode.domain.classroom.RegisterClassroomDTO;
import com.zecorode.domain.course.Course;
import com.zecorode.repositories.ClassroomRepository;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private CourseService courseService;


    public void createClassroom(RegisterClassroomDTO registerClassroomDTO){
        Classroom classroom = new Classroom(); 
        classroom.setNameClass(registerClassroomDTO.nameClass());
        classroom.setDuration(registerClassroomDTO.duration());
        Course course = courseService.getCourseById(registerClassroomDTO.courseId());
        classroom.setCourse(course);
        classroomRepository.save(classroom);
    }
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }
}
