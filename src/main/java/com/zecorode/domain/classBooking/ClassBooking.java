package com.zecorode.domain.classBooking;

import java.time.LocalDateTime;

import com.zecorode.domain.student.Student;
import com.zecorode.domain.teacher.Teacher;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "class_booking")
public class ClassBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;
    
    @ManyToOne
    private Teacher teacher;

    @Enumerated(EnumType.STRING)
    private StatusBooking status;
    
    private LocalDateTime startsDateTime;
  
    private LocalDateTime endsDateTime;
}
