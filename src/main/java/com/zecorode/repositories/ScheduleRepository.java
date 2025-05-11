package com.zecorode.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.scheduleClass.ScheduleClass;

public interface ScheduleRepository extends JpaRepository<ScheduleClass, Long>{
    boolean existsByScheduleHourAndTeacherIdAndStudentId(LocalDateTime scheduleHour, Long teacherId, Long studentId);
}
