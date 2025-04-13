package com.zecorode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zecorode.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);

    
}
