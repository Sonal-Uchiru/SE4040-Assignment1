package com.example.mobile_app.service;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.UpadateUserRespose;
import com.example.mobile_app.response.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UserService {

    @POST("users")
    Call<RegistrationResponse> register(@Body NewUser request);
    @GET("users/{id}")
    Call<UserResponse> getUserDetails(@Path("id") String userId);

    @PUT("usersNew/{id}")
    Call<UpadateUserRespose> updateSelectedUser(@Path("id") String userId, Object obj);

    @PATCH("usersNew/{id}/toggleActivation")
    Call<UpadateUserRespose> deactivateAccount(@Path("id") String userId);

}
