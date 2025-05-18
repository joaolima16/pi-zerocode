// package com.zecorode.domain.course;

// import java.util.List;

// import com.zecorode.domain.classroom.Classroom;
// import com.zecorode.domain.teacher.Teacher;

// public class CourseResponseDTO {
//     private Long id;
//     private String name;
//     private String description;
//     private Teacher teacher;
//     private List<Classroom> classrooms;

//     public CourseResponseDTO(Course course) {
//         this.id = course.getId();
//         this.name = course.getName();
//         this.description = course.getDescription();
//         this.teacher = new Teacher(course.getTeacher());
//         this.classrooms = course.getClassrooms().stream()
//             .map(ClassroomDTO::new)
//             .toList();
//     }
// }
