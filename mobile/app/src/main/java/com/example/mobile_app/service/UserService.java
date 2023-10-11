package com.example.mobile_app.service;

import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.UserUpdateModel;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.CommanResponse;
import com.example.mobile_app.response.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UserService {

    /**
     * Registers a new user on the server.
     * @param request The user registration details.
     * @return A Call object for the registration response.
     */
    @POST("users")
    Call<RegistrationResponse> register(@Body NewUser request);


    /**
     * Retrieves user details from the server.
     * @param userId The ID of the user to fetch details for.
     * @return A Call object for the user details response.
     */
    @GET("users/{id}")
    Call<UserResponse> getUserDetails(@Path("id") String userId);

    /**
     * Updates selected user details on the server.
     * @param userId The ID of the user to update.
     * @param obj    The user details to update.
     * @return A Call object for the response.
     */
    @PUT("users/{id}")
    Call<CommanResponse> updateSelectedUser(@Path("id") String userId, @Body UserUpdateModel obj);

    /**
     * Deactivates a user account on the server.
     * @param userId The ID of the user account to deactivate.
     * @return A Call object for the deactivation response.
     */
    @PATCH("users/{id}/toggleactivation")
    Call<CommanResponse> deactivateAccount(@Path("id") String userId);

}
