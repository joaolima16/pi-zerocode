package com.zecorode.domain.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RegisterTeacherDTO(String name, String cpf, LocalDate dateBirth,String phone ,String areaTeaching, String email, String password, BigDecimal valuePerHour) {
}
