package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zecorode.domain.teacher.RegisterTeacherDTO;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.TeacherRepository;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private AuthorizationService authorizationService;
    
    public Teacher create(RegisterTeacherDTO registerTeacherDTO) {
        Teacher teacher = new Teacher();
        teacher.setName(registerTeacherDTO.name());
        teacher.setCpf(registerTeacherDTO.cpf());
        teacher.setDateBirthday(registerTeacherDTO.dateBirthday());
        teacher.setEmail(registerTeacherDTO.email());
        teacher.setPassword(registerTeacherDTO.password());
        teacher.setArea_teaching(registerTeacherDTO.areaTeaching());
        Teacher teacherSaved = teacherRepository.save(teacher);
        if(teacherSaved == null) {
            throw new RuntimeException("Teacher not saved");
        }
        User userTeacher = new User(teacherSaved.getEmail(), teacherSaved.getPassword(), SystemRole.TEACHER);
        authorizationService.create(userTeacher
        );
        return teacherSaved;
    }
}
