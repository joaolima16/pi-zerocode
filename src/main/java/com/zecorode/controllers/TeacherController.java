package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.teacher.RegisterTeacherDTO;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.services.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;
    @PostMapping("/create")
    public ResponseEntity<Teacher> create(@RequestBody RegisterTeacherDTO registerTeacherDTO) {
        Teacher teacher = teacherService.create(registerTeacherDTO);
        return ResponseEntity.ok(teacher);
    }
}
