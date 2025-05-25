package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zecorode.domain.student.RegisterStudentDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.domain.student.UpdateStudentDTO;
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Student create(RegisterStudentDTO student) {
        try {
            Student newStudent = new Student();
            newStudent.setName(student.name());
            newStudent.setCpf(student.cpf());
            newStudent.setDateBirthday(student.dateBirth());
            newStudent.setEmail(student.email());
            newStudent.setPhone(student.phone());
            newStudent.setPassword(passwordEncoder.encode(student.password()));
            Student authStudent = studentRepository.save(newStudent);
            if (authStudent == null) {
                throw new RuntimeException("Error to create student");
            }
            User userAuth = new User(authStudent.getEmail(), authStudent.getPassword(), SystemRole.STUDENT);
            authorizationService.create(userAuth);
            return authStudent;
        } catch (Exception e) {
            throw new RuntimeException("Error to create student");
        }
    }

    public Student getStudent(Long id) {
        try {
            return studentRepository.findById(id).get();
        } catch (Exception e) {
            throw new RuntimeException("Error to get student");
        }
    }

    public Student update(Long id, UpdateStudentDTO student) {
        try {
            Student studentToUpdate = studentRepository.findById(id).get();
            studentToUpdate.setName(student.name());
            studentToUpdate.setPhone(student.phone());
            studentToUpdate.setEmail(student.email());
            return studentRepository.save(studentToUpdate);
        } catch (Exception e) {
            throw new RuntimeException("Error to update student");
        }
    }

    public Student findByEmail(String email) {
        try {
            return studentRepository.findByEmail(email);
        } catch (Exception e) {
            throw new RuntimeException("Error to get student");
        }
    }

    public void deleteStudent(Long id) {
        System.out.println(id);
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Estudante com ID " + id + " não encontrado.");
        }

        studentRepository.deleteById(id);
    }
}
