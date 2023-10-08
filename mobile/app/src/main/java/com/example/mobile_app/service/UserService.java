package com.example.mobile_app.service;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.response.RegistrationResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserService {

    @POST("users")
    Call<RegistrationResponse> register(@Body NewUser request);
    @GET("users/{id}")
    Call<RegistrationResponse> getUserDetails(@Path("id") int userId);


}
