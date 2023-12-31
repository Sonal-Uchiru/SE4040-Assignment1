package com.example.mobile_app.managers;

import android.util.Log;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.UserUpdateModel;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.CommanResponse;
import com.example.mobile_app.response.UserResponse;
import com.example.mobile_app.service.UserService;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserManager {
    private static UserManager singleton;
    private UserService userService;


    public static UserManager getInstance() {
        // Check if the 'singleton' instance is null
        if (singleton == null)
            singleton = new UserManager();
        //Returing instance
        return singleton;
    }

    private UserManager() {
        // Create an instance of the 'UserService' by using 'NetworkManager'
        userService = NetworkManager.getInstance().createService(UserService.class);
    }

    public void register(
            NewUser newUser,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }

        // Call the 'userService' service and handle the response
        userService.register(newUser)
                .enqueue(new Callback<RegistrationResponse>() {
                    @Override
                    public void onResponse(Call<RegistrationResponse> call, Response<RegistrationResponse> response) {
                        // Check if the response body is not null
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<RegistrationResponse> call, Throwable t) {
                        onError.accept("Unknown Error:" + t.getMessage());
                    }
                });
    }

    public void getUserDetails(
            String id,
            Consumer<UserResponse> onSuccess,
            Consumer<String> onError
    ) {
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()) {
            onError.accept("No internet connectivity");
            return;
        }

        // Call the 'userService' service and handle the response
        userService.getUserDetails(id).enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    // Check if the response body is not null
                    UserResponse userResponse = response.body();
                    if (userResponse != null) {
                        onSuccess.accept(userResponse);
                    } else {
                        onError.accept("Response is empty");
                    }
                } else {
                    onError.accept("Request failed with status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Log.d("MyApp", "This is a debug message." + t.getMessage());
                onError.accept("Network request failed: " + t.getMessage());
            }
        });
    }

    public void updateUser(
            String id,
            String firstName,
            String lastName,
            int mobile,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }


        // Create a 'UserUpdateModel' object
        UserUpdateModel user = new UserUpdateModel(firstName, lastName, mobile);

        // Call the 'userService' service and handle the response
        userService.updateSelectedUser(id, user)
                .enqueue(new Callback<CommanResponse>() {
                    @Override
                    public void onResponse(Call<CommanResponse> call, Response<CommanResponse> response) {
                        // Check if the response body is not null
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<CommanResponse> call, Throwable t) {
                        onError.accept("Unknown Error:" + t.getMessage());
                    }
                });
    }

    public void toggleUserAccount(
            String id,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }

        // Call the 'userService' service and handle the response
        userService.deactivateAccount(id)
                .enqueue(new Callback<CommanResponse>() {
                    @Override
                    public void onResponse(Call<CommanResponse> call, Response<CommanResponse> response) {
                        // Check if the response body is not null
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<CommanResponse> call, Throwable t) {
                        onError.accept("Unknown Error:" + t.getMessage());
                    }
                });
    }



}
