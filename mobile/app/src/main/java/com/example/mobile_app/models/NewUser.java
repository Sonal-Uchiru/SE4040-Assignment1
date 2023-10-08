package com.example.mobile_app.models;

public class User {
    private String nic, firstName, lastName, email, password;
    private int mobile, role;

    public User(String nic, String firstName, String lastName, String email, String password, int mobile, int role) {
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.role = role;
    }

    public String getNic() {
        return nic;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public int getMobile() {
        return mobile;
    }

    public int getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }
}
