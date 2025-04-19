package com.zecorode.domain.classroom;

import java.math.BigDecimal;

public record RegisterClassroomDTO(String nameClass, BigDecimal duration, Long courseId) {
    
}
