package com.zecorode.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zecorode.domain.teacher.RegisterTeacherDTO;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.domain.teacher.UpdateTeacherDTO;
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.TeacherRepository;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Teacher create(RegisterTeacherDTO registerTeacherDTO) {
        Teacher teacher = new Teacher();
        teacher.setName(registerTeacherDTO.name());
        teacher.setCpf(registerTeacherDTO.cpf());
        teacher.setDateBirthday(registerTeacherDTO.dateBirth());
        teacher.setPhone(registerTeacherDTO.phone());
        teacher.setAreaTeaching(registerTeacherDTO.areaTeaching());
        teacher.setEmail(registerTeacherDTO.email());
        teacher.setCodeTeacher(generateUniqueCode());
        teacher.setPassword(passwordEncoder.encode(registerTeacherDTO.password()));
        teacher.setValuePerHour(registerTeacherDTO.valuePerHour());
        Teacher teacherSaved = teacherRepository.save(teacher);
        if (teacherSaved == null) {
            throw new RuntimeException("Teacher not saved");
        }
        User userTeacher = new User(teacherSaved.getEmail(), teacherSaved.getPassword(), SystemRole.TEACHER);
        authorizationService.create(userTeacher);
        return teacherSaved;
    }

    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    public Teacher findById(Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    public Teacher updateTeacher(Long id, UpdateTeacherDTO updateTeacherDTO) {
        Teacher teacher = findById(id);
        if (teacher == null) {
            return null;
        }
        teacher.setName(updateTeacherDTO.name());
        teacher.setAreaTeaching(updateTeacherDTO.areaTeaching());
        teacher.setPhone(updateTeacherDTO.phone());
        teacher.setEmail(updateTeacherDTO.email());

        teacher.setValuePerHour(updateTeacherDTO.valuePerHour());
        return teacherRepository.save(teacher);
    }

    public int generateUniqueCode() {
        return (int) (Math.random() * 100_000_000); // Gera até 8 dígitos
    }
    public Teacher findByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }
}
