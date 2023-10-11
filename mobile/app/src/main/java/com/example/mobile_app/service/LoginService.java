package com.example.mobile_app.service;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.response.LoginResponse;

import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.Call;

public interface LoginService {
    /**
     * Performs a user login request to the server.
     * @param request The Login object containing user credentials.
     * @return A Call object for the login response.
     */
    @POST("authentications")
     Call<LoginResponse> login(@Body Login request);

}
