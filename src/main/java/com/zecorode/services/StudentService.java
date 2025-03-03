package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zecorode.domain.student.RegisterStudentDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.StudentRepository;

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

    public Student update(Long id, RegisterStudentDTO student) {
        try {
            Student studentToUpdate = studentRepository.findById(id).get();
            studentToUpdate.setName(student.name());
            studentToUpdate.setCpf(student.cpf());
            studentToUpdate.setDateBirthday(student.dateBirth());
            studentToUpdate.setEmail(student.email());
            studentToUpdate.setPassword(new BCryptPasswordEncoder().encode(student.password()));
            return studentRepository.save(studentToUpdate);
        } catch (Exception e) {
            throw new RuntimeException("Error to update student");
        }
    }
}
