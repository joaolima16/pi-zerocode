package com.zecorode.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.classroom.Classroom;
import com.zecorode.domain.classroom.RegisterClassroomDTO;
import com.zecorode.services.ClassroomService;

@RestController
@RequestMapping("/classroom")
public class ClassRoomController {
    
    @Autowired
    private ClassroomService classroomService;
    @PostMapping
    public ResponseEntity<String> createClassRoom(@RequestBody RegisterClassroomDTO registerClassroomDTO) {
        classroomService.createClassroom(registerClassroomDTO);
        return ResponseEntity.ok().body("Classroom created successfully!");
    }
    @GetMapping("/all")
    public ResponseEntity<List<Classroom>> getAllClassrooms() {
        List<Classroom> classrooms = this.classroomService.getAllClassrooms();
        return ResponseEntity.ok(classrooms);
    }
}
