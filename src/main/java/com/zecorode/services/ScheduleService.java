package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zecorode.domain.schedule.CreateScheduleDTO;
import com.zecorode.domain.schedule.Schedule;
import com.zecorode.domain.student.Student;
import com.zecorode.domain.teacher.Teacher;
import com.zecorode.repositories.ScheduleRepository;
import com.zecorode.repositories.StudentRepository;
import com.zecorode.repositories.TeacherRepository;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    public void createSchedule(CreateScheduleDTO createScheduleDTO) {
        Teacher teacher = teacherRepository.findById(createScheduleDTO.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        Student student = studentRepository.findById(createScheduleDTO.studentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Schedule scheduleClass = new Schedule();
        boolean isTeacherAvailable = scheduleRepository.existsByScheduleHourAndTeacherIdAndStudentId(
                createScheduleDTO.scheduleHour(), createScheduleDTO.teacherId(), createScheduleDTO.studentId());
        if (isTeacherAvailable) {
            throw new RuntimeException("Já existe uma aula agendada com o professor nesse horário.");
        }
        scheduleClass.setTeacher(teacher);
        scheduleClass.setStudent(student);
        scheduleClass.setSubject(createScheduleDTO.subject());
        scheduleClass.setStatus(createScheduleDTO.status());
        scheduleClass.setScheduleHour(createScheduleDTO.scheduleHour());
        scheduleRepository.save(scheduleClass);
    }
}
