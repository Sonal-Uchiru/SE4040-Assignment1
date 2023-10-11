package com.example.mobile_app.models;

public class UserUpdateModel {
    String firstName, lastName;
    int mobile;

    public UserUpdateModel(String firstName, String lastName, int mobile) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
    }
}
