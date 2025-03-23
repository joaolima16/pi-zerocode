package com.zecorode.domain.teacher;

import java.time.LocalDate;

public record RegisterTeacherDTO(String name, String cpf, LocalDate dateBirth,String phone ,String area_teaching, String email, String password) {
}
