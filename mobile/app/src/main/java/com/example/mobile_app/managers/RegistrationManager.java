package com.example.mobile_app.managers;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.service.UserService;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistrationManager {
    private static RegistrationManager singleton;
    private UserService userService;


    public static RegistrationManager getInstance() {
        if (singleton == null)
            singleton = new RegistrationManager();
        return singleton;
    }

    private RegistrationManager() {
        userService = NetworkManager.getInstance().createService(UserService.class);
    }

    public void register(
            NewUser newUser,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }
        userService.register(newUser)
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
