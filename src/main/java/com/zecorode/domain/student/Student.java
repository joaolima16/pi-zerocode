package com.zecorode.domain.student;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Student {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(length = 100, nullable = false)
        private String name;

    
        @Column(length = 11, nullable = false, unique = true)
        private String cpf;

        @Column(name = "date_birthday", nullable = false)
        private LocalDate dateBirthday;


        @Column(length = 100, nullable = false, unique = true)
        private String email;

        @Column(length = 70, nullable = false)
        private String password;
}
