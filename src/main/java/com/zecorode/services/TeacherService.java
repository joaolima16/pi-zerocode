package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zecorode.domain.teacher.RegisterTeacherDTO;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.TeacherRepository;
import com.zecorode.repositories.UserRepository;

@Service
public class TeacherService {

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private TeacherRepository teacherRepository;

  @Autowired
  private AuthorizationService authorizationService;


  public Teacher create(RegisterTeacherDTO registerTeacherDTO) {
    Teacher teacher = generateTeacherFromDTO(registerTeacherDTO);
    Teacher savedTeacher = teacherRepository.save(teacher);
    if (savedTeacher == null) {
      throw new RuntimeException("Error to create teacher");
    }
    User userAuth = new User(savedTeacher.getEmail(), savedTeacher.getPassword(), SystemRole.TEACHER);
    authorizationService.create(userAuth);
    return savedTeacher;
  }
  public Teacher generateTeacherFromDTO(RegisterTeacherDTO registerTeacherDTO) {
    Teacher teacher = new Teacher();
    teacher.setName(registerTeacherDTO.name());
    teacher.setCpf(registerTeacherDTO.cpf());
    teacher.setDateBirthday(registerTeacherDTO.dateBirth());
    teacher.setEmail(registerTeacherDTO.email());
    teacher.setPassword(passwordEncoder.encode(registerTeacherDTO.password()));
    teacher.setCodeTeacher(registerTeacherDTO.code_teacher());
    return teacher;

  }
}
