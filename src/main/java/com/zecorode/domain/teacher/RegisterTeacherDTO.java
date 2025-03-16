package com.zecorode.domain.teacher;

import java.time.LocalDate;

public record RegisterTeacherDTO(String name, String cpf, LocalDate dateBirth,String email, String password, int code_teacher) {
    
}
