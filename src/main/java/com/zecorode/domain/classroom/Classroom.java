// package com.zecorode.domain.classroom;

// import java.math.BigDecimal;
// import java.text.DecimalFormat;

// import jakarta.annotation.Generated;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// @Table(name = "classroom")
// public class Classroom {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private long id;

//     @Column(name = "name_class", length = 50, nullable = false)
//     private String name_class;
    
//     @Column(name = "duration", precision = 10, scale = 2, nullable = false)
//     private BigDecimal  duration;

//     @Column(name = "value_classroom", precision = 10, scale = 2, nullable = false)
//     private BigDecimal value_classroom;

    

// }
