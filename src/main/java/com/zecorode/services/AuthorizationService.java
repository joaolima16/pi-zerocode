package com.zecorode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zecorode.domain.user.RegisterDTO;
import com.zecorode.domain.user.User;
import com.zecorode.repositories.UserRepository;

@Service
public class AuthorizationService implements UserDetailsService{


    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username);
    }
    public User create(User user){
        try{
            return repository.save(user);
        }
        catch(Exception e){
            throw new RuntimeException("Error to create user");
        }
    }
    public User create(RegisterDTO registerDTO){
        User user = new User(registerDTO.email(), registerDTO.password(), registerDTO.role());
        return create(user);
    }
    
}
