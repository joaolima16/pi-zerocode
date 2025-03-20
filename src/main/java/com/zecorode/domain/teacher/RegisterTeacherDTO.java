package com.zecorode.domain.teacher;

import java.time.LocalDate;

public record RegisterTeacherDTO(String name, String cpf, LocalDate dateBirthday, String areaTeaching, String email, String password) {
}
