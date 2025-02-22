package com.zecorode.domain.user;

public enum SystemRole {
    TEACHER("teacher"),
    STUDENT("student");

    private String role;

    SystemRole(String role) {
        this.role = role;
    }
    public String getRole(){
        return role;
    }
}
