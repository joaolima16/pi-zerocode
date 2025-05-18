package com.zecorode.domain.course;

import java.math.BigDecimal;

public record RegisterCourseDTO(String name, String description, BigDecimal price,Long teacherId) {
    
}
