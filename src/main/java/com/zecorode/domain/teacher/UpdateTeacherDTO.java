package com.zecorode.domain.teacher;

import java.math.BigDecimal;

public record UpdateTeacherDTO(String name, String areaTeaching, String phone, String email, BigDecimal valuePerHour) {
    
}
