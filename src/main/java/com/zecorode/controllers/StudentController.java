package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.student.RegisterStudentDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.domain.student.UpdateStudentDTO;
import com.zecorode.services.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://127.0.0.1:5500")
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
    public ResponseEntity<Student> update(@RequestBody @Valid UpdateStudentDTO student, @PathVariable Long id){
        Student studentUpdated = studentService.update(id, student);
        if(studentUpdated == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(studentUpdated);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id){
        Student student = studentService.getStudent(id);
        if(student == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        Student student = studentService.getStudent(id);
        if(student == null){
            return ResponseEntity.notFound().build();
        }
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
