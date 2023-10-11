package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mobile_app.managers.UserManager;
import com.example.mobile_app.models.NewUser;

public class RegisterActivity extends AppCompatActivity {
    private UserManager userManager;
    EditText ed_firstName, ed_lastName, ed_email, ed_mobile, ed_nic, ed_password;
    Button btnRegister;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Call the superclass's onCreate method.
        super.onCreate(savedInstanceState);

        // Set the activity's content view to the registration layout.
        setContentView(R.layout.activity_register);

        // Find and reference the EditText fields and the registration button.
        ed_firstName = findViewById(R.id.ed_firstname);
        ed_lastName = findViewById(R.id.ed_last_name);
        ed_email = findViewById(R.id.ed_email);
        ed_mobile = findViewById(R.id.ed_mobile);
        ed_nic = findViewById(R.id.ed_nic);
        ed_password = findViewById(R.id.ed_password);
        btnRegister = findViewById(R.id.register_btn);

        // Initialize UserManager to manage user-related operations.
        userManager = UserManager.getInstance();

        btnRegister.setOnClickListener(view -> {
            register();
        });
    }

    private void register(){
        // Retrieve user input data from EditText fields.
        String firstname = ed_firstName.getText().toString();
        String lastname = ed_lastName.getText().toString();
        String email = ed_email.getText().toString();
        String mobileStr = ed_mobile.getText().toString();
        int mobile = Integer.parseInt(mobileStr);
        String nic = ed_nic.getText().toString();
        String password = ed_password.getText().toString();

        // Create a NewUser object with the user's registration data.
        NewUser newUser = new NewUser(nic, firstname, lastname, email, password, mobile, 0);

        // Call UserManager's register method to initiate the registration process.
        userManager.register(
                newUser,
                () -> registerSuccess(),
                error -> handleRegisterfailed(error));
    }

    public void registerSuccess() {
        Toast.makeText(this, "Registration sucessfull", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);

    }
    public void onNavigateToLogin(View view) {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    private void handleRegisterfailed(String error){
        Toast.makeText(this, error, Toast.LENGTH_LONG).show();
    }
}