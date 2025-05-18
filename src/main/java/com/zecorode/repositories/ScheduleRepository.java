package com.zecorode.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.schedule.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
    boolean existsByScheduleHourAndTeacherIdAndStudentId(LocalDateTime scheduleHour, Long teacherId, Long studentId);
}
