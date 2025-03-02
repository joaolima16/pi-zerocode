package com.zecorode.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.zecorode.domain.student.RegisterStudentDTO;
import com.zecorode.domain.student.Student;
import com.zecorode.repositories.StudentRepository;

@Service
public class StudentService {
   
    @Autowired
    private StudentRepository  studentRepository;

    public Student create(RegisterStudentDTO student) {
        try{
            Student newStudent = new Student();
            newStudent.setName(student.name());
            newStudent.setCpf(student.cpf());
            newStudent.setDateBirthday(student.dateBirth());
            newStudent.setEmail(student.email());
            newStudent.setPassword(new BCryptPasswordEncoder().encode(student.password()));
           
            return studentRepository.save(newStudent);
        }
        catch(Exception e){
            throw new RuntimeException("Error to create student");
        }
    }
    public Student update(Long id, RegisterStudentDTO student) {
        try{
            Student studentToUpdate = studentRepository.findById(id).get();
            studentToUpdate.setName(student.name());
            studentToUpdate.setCpf(student.cpf());
            studentToUpdate.setDateBirthday(student.dateBirth());
            studentToUpdate.setEmail(student.email());
            studentToUpdate.setPassword(new BCryptPasswordEncoder().encode(student.password()));
            return studentRepository.save(studentToUpdate);
        }
        catch(Exception e){
            throw new RuntimeException("Error to update student");
        }
    }
}
