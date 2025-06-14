package com.zecorode.domain.teacher;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.zecorode.domain.course.Course;
import com.zecorode.domain.schedule.Schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @Column(name = "code_teacher", nullable = false, unique = true)
    private int codeTeacher;

    @OneToMany(mappedBy = "teacher")
    @JsonManagedReference
    private List<Course> courses;
    
    @OneToMany(mappedBy = "teacher")
    private List<Schedule> schedules;
}
