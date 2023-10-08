package com.example.mobile_app.service;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.response.LoginResponse;

import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.Call;

public interface LoginService {
    @POST("api/v1/authentications")
     Call<LoginResponse> login(@Body Login request);

}
