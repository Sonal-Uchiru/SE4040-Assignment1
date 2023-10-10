package com.example.mobile_app.service;

import com.example.mobile_app.models.NewReservation;
import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.UserReservation;
import com.example.mobile_app.response.CommanResponse;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.UserReservationResponse;
import com.example.mobile_app.response.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ReservationService {
    @POST("reservations")
    Call<CommanResponse> addReservation(@Header("Authorization") String authToken, @Body NewReservation reservation);

    @GET("users/reservations/list")
    Call<UserReservationResponse> fetchUserReservations(@Header("Authorization") String authToken);

    @DELETE("reservations/{id}")
    Call<CommanResponse> deleteUserReservation(@Header("Authorization") String authToken, @Path("id") String userId);

    @PATCH("reservations/{id}")
    Call<CommanResponse> updateReservation(@Header("Authorization") String authToken, @Path("id") String userId, @Body Object obj);
}
