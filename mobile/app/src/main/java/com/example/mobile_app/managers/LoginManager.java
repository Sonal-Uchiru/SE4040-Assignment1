package com.example.mobile_app.managers;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.response.LoginResponse;
import com.example.mobile_app.service.LoginService;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class LoginManager {
    private static LoginManager singleton;
    private LoginService loginService;

    public static LoginManager getInstance() {
        // Check if the 'singleton' instance is null
        if (singleton == null)
            singleton = new LoginManager();
        //Returing instance
        return singleton;
    }

    private LoginManager() {
        // Create an instance of the 'LoginService' by using 'NetworkManager'
        loginService = NetworkManager.getInstance().createService(LoginService.class);
    }

    public void login(
            String nic,
            String password,
            Consumer<LoginResponse> onSuccess,
            Consumer<String> onError
    ){
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }

        // Create a 'Login' object with NIC and password
        Login body = new Login(nic, password);

        // Call the 'login' service and handle the response
        loginService.login(body)
                .enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        // Check if the response body and token are not null
                        if (response.body() != null && response.body().token != null) {
                            onSuccess.accept(response.body());
                        }else{
                            onError.accept("NIC or password is Incorrect");
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }

}
