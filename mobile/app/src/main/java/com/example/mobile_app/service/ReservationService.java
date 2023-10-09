package com.example.mobile_app.service;

import com.example.mobile_app.models.NewReservation;
import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.UserReservation;
import com.example.mobile_app.response.CommanResponse;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.UserReservationResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ReservationService {
    @POST("reservations")
    Call<CommanResponse> addReservation(@Header("Authorization") String authToken, @Body NewReservation reservation);

    @GET("users/reservations/list")
    Call<UserReservationResponse> fetchUserReservations(@Header("Authorization") String authToken);
}
