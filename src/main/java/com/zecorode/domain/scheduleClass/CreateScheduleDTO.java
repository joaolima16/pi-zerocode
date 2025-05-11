package com.zecorode.domain.scheduleClass;

import java.time.LocalDateTime;

public record CreateScheduleDTO(Long studentId, Long teacherId, String subject, LocalDateTime scheduleHour,String status) {

    
}
