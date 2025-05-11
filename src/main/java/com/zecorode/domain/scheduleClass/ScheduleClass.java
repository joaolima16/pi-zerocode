package com.zecorode.domain.scheduleClass;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.zecorode.domain.student.Student;
import com.zecorode.domain.teacher.Teacher;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schedules")
public class ScheduleClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime scheduleHour;

    private String subject;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Teacher teacher;
 

    private String status;

    

}
