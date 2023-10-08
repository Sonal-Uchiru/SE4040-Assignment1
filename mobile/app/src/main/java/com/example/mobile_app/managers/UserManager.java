package com.example.mobile_app.managers;

import android.util.Log;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.User;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.TrainScheduleResponse;
import com.example.mobile_app.response.UpadateUserRespose;
import com.example.mobile_app.response.UserResponse;
import com.example.mobile_app.service.UserService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserManager {
    private static UserManager singleton;
    private UserService userService;


    public static UserManager getInstance() {
        if (singleton == null)
            singleton = new UserManager();
        return singleton;
    }

    private UserManager() {
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

    public void getUserDetails(
            String id,
            Consumer<UserResponse> onSuccess,
            Consumer<String> onError
    ) {
        if (!NetworkManager.getInstance().isNetworkAvailable()) {
            onError.accept("No internet connectivity");
            return;
        }

        userService.getUserDetails(id).enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
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
    ) throws JSONException {
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("firstName", firstName);
        jsonObject.put("lastName", lastName);
        jsonObject.put("mobile", mobile);


        userService.updateUser(id, jsonObject)
                .enqueue(new Callback<UpadateUserRespose>() {
                    @Override
                    public void onResponse(Call<UpadateUserRespose> call, Response<UpadateUserRespose> response) {
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<UpadateUserRespose> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }
}
