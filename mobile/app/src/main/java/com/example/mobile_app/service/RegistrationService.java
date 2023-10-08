package com.example.mobile_app.service;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.response.RegistrationResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RegistrationService {
    @POST("users")
    Call<RegistrationResponse> register(@Body NewUser request);
}
