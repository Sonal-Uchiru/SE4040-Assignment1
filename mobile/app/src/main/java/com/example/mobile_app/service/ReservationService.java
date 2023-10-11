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
    /**
     * Adds a new reservation to the server.
     * @param authToken   The user's authorization token.
     * @param reservation The reservation details to add.
     * @return A Call object for the response.
     */
    @POST("reservations")
    Call<CommanResponse> addReservation(@Header("Authorization") String authToken, @Body NewReservation reservation);

    /**
     * Fetches the list of user reservations from the server.
     * @param authToken The user's authorization token.
     * @return A Call object for the user's reservation response.
     */
    @GET("users/reservations/list")
    Call<UserReservationResponse> fetchUserReservations(@Header("Authorization") String authToken);


    /**
     * Deletes a user reservation on the server.
     * @param authToken The user's authorization token.
     * @param userId    The ID of the reservation to delete.
     * @return A Call object for the response.
     */
    @DELETE("reservations/{id}")
    Call<CommanResponse> deleteUserReservation(@Header("Authorization") String authToken, @Path("id") String userId);

    /**
     * Updates a user's reservation on the server.
     * @param authToken The user's authorization token.
     * @param userId    The ID of the reservation to update.
     * @param obj       The reservation update details.
     * @return A Call object for the response.
     */
    @PATCH("reservations/{id}")
    Call<CommanResponse> updateReservation(@Header("Authorization") String authToken, @Path("id") String userId, @Body Object obj);
}
