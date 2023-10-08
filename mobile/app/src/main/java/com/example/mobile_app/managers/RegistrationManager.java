package com.example.mobile_app.managers;

import android.util.Log;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.models.User;
import com.example.mobile_app.response.LoginResponse;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.service.LoginService;
import com.example.mobile_app.service.RegistrationService;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistrationManager {
    private static RegistrationManager singleton;
    private RegistrationService registrationService;


    public static RegistrationManager getInstance() {
        if (singleton == null)
            singleton = new RegistrationManager();
        return singleton;
    }

    private RegistrationManager() {
        registrationService = NetworkManager.getInstance().createService(RegistrationService.class);
    }

    public void register(
            User user,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }
        registrationService.register(user)
                .enqueue(new Callback<RegistrationResponse>() {
                    @Override
                    public void onResponse(Call<RegistrationResponse> call, Response<RegistrationResponse> response) {
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<RegistrationResponse> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }
}
