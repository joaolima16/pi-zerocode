package com.zecorode.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.teacher.RegisterTeacherDTO;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.domain.teacher.UpdateTeacherDTO;
import com.zecorode.services.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/create")
    public ResponseEntity<Teacher> create(@RequestBody RegisterTeacherDTO registerTeacherDTO) {
        Teacher teacher = teacherService.create(registerTeacherDTO);
        if (teacher == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(teacher);
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> findAll() {
        List<Teacher> teachers = teacherService.findAll();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> findById(@PathVariable Long id) {
        Teacher teacher = teacherService.findById(id);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(teacher);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Teacher> update(@PathVariable Long id, @RequestBody UpdateTeacherDTO updateTeacherDTO) {
        Teacher teacher = teacherService.updateTeacher(id, updateTeacherDTO);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(teacher);
    }
}
