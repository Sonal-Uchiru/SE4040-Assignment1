package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mobile_app.managers.ContextManager;
import com.example.mobile_app.managers.LoginManager;
import com.example.mobile_app.response.LoginResponse;
import com.example.mobile_app.utilities.TokenManager;

public class LoginActivity extends AppCompatActivity {
    private LoginManager loginManager;
    EditText ed_nic, ed_password;
    Button btnLogin;
    TokenManager tokenManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set the content view to the login layout.
        setContentView(R.layout.activity_login);

        // Initialize TokenManager for managing authentication tokens.
        tokenManager = new TokenManager(this);

        // Find and reference the NIC and password input fields and login button.
        ed_nic = findViewById(R.id.l_ed_nic);
        ed_password = findViewById(R.id.l_ed_password);
        btnLogin = findViewById(R.id.login_btn);

        // Set the application context using ContextManager for global access.
        ContextManager.getInstance().setApplicationContext(getApplicationContext());
        loginManager = LoginManager.getInstance();

        // Set a click listener for the login button to trigger the login process.
        btnLogin.setOnClickListener(view -> {
            login();
        });
    }

    private void login(){
        String nic = ed_nic.getText().toString();
        String password = ed_password.getText().toString();

        loginManager.login(
                nic,
                password,
                loginResponse -> onNavigateToHome(loginResponse),
                error -> handleLoginFailed(error));
    }

    private void handleLoginFailed(String error){
        Toast.makeText(this, error, Toast.LENGTH_LONG).show();
    }


    public void onNavigateToRegister(View view) {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }

    public void onNavigateToHome(LoginResponse loginResponse) {
        tokenManager.saveToken(loginResponse);
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }
}