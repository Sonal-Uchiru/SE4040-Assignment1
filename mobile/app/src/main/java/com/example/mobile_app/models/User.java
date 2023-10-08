package com.example.mobile_app.models;

public class User {
    private String id, nic, firstName, lastName, email;
    private int mobile, role;
    boolean isEnabled;

    public User(String id, String nic, String firstName, String lastName, String email, int mobile, int role, boolean isEnabled) {
        this.id = id;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.role = role;
        this.isEnabled = isEnabled;
    }

    public String getId() {
        return id;
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

    public boolean isEnabled() {
        return isEnabled;
    }
}
