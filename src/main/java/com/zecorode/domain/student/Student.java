package com.zecorode.domain.student;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zecorode.domain.course.Course;
import com.zecorode.domain.schedule.Schedule;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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

        @Column(name = "phone", length = 13, nullable = false)
        private String phone;

        @Column(name = "date_birthday", nullable = false)
        private LocalDate dateBirthday;

        @Column(length = 100, nullable = false, unique = true)
        private String email;

        @Column(length = 70, nullable = false)
        private String password;

        @JsonIgnore
        @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE, orphanRemoval = true)
        private List<Schedule> schedules;

        @ManyToMany
        @JoinTable(name = "student_course", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
        private List<Course> purchasedCourses;
}
