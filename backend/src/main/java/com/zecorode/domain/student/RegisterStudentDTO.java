package com.zecorode.domain.student;

import java.time.LocalDate;

public record RegisterStudentDTO(String name, String cpf, LocalDate dateBirth,String phone,String email, String password) {
    
}
