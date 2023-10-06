package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mobile_app.managers.ContextManager;
import com.example.mobile_app.managers.LoginManager;

public class LoginActivity extends AppCompatActivity {

    private LoginManager loginManager;
    EditText ed_nic, ed_password;
    Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ed_nic = findViewById(R.id.ed_nic);
        ed_password = findViewById(R.id.ed_password);
        btnLogin = findViewById(R.id.login_btn);

        ContextManager.getInstance().setApplicationContext(getApplicationContext());
        loginManager = LoginManager.getInstance();

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
                () -> onNavigateToHome(),
                error -> handleLoginFailed(error));
    }


    private void handleLoginFailed(String error){
        Toast.makeText(this, error, Toast.LENGTH_LONG).show();
    }


    public void onNavigateToRegister(View view) {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }

    public void onNavigateToHome() {
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
    }
}