package com.zecorode.domain.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 100, nullable = false)
    private String name;


    @Column(length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(name = "date_birthday", nullable = false)
    private LocalDate dateBirthday;
    
    @Column(name = "phone", length = 13, nullable = false)
    private String phone;
 
    @Column(name = "area_teaching", length = 100, nullable = false)
    private String areaTeaching;

    
    @Column(name = "value_per_hour", nullable = false, precision = 10, scale = 2)
    private BigDecimal valuePerHour;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 70, nullable = false)
    private String password;

    @Column(name = "code_teacher", length = 10, nullable = false, unique = true)
    private int codeTeacher;
    
}
