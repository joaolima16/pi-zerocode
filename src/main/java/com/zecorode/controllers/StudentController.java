package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.student.RegisterStudentDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.services.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;


    @PostMapping("/create")
    public ResponseEntity<Student> create(@RequestBody @Valid RegisterStudentDTO student){
        Student newStudent = studentService.create(student);
        if(newStudent == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newStudent);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> update(@RequestBody @Valid RegisterStudentDTO student, @PathVariable Long id){
        Student studentUpdated = studentService.update(id, student);
        if(studentUpdated == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(studentUpdated);
    }
}
