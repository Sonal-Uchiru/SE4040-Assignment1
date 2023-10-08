package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mobile_app.managers.RegistrationManager;
import com.example.mobile_app.models.NewUser;

public class RegisterActivity extends AppCompatActivity {
    private RegistrationManager registrationManager;
    EditText ed_firstName, ed_lastName, ed_email, ed_mobile, ed_nic, ed_password;
    Button btnRegister;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        ed_firstName = findViewById(R.id.ed_firstname);
        ed_lastName = findViewById(R.id.ed_last_name);
        ed_email = findViewById(R.id.ed_email);
        ed_mobile = findViewById(R.id.ed_mobile);
        ed_nic = findViewById(R.id.ed_nic);
        ed_password = findViewById(R.id.ed_password);
        btnRegister = findViewById(R.id.register_btn);
        registrationManager = RegistrationManager.getInstance();

        btnRegister.setOnClickListener(view -> {
            register();
        });
    }

    private void register(){
        String firstname = ed_firstName.getText().toString();
        String lastname = ed_lastName.getText().toString();
        String email = ed_email.getText().toString();
        String mobileStr = ed_mobile.getText().toString();
        int mobile = Integer.parseInt(mobileStr);
        String nic = ed_nic.getText().toString();
        String password = ed_password.getText().toString();

        NewUser newUser = new NewUser(nic, firstname, lastname, email, password, mobile, 0);
        registrationManager.register(
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