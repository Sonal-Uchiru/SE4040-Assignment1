package com.example.mobile_app.managers;

import android.util.Log;

import com.example.mobile_app.models.NewReservation;
import com.example.mobile_app.models.NewUser;
import com.example.mobile_app.models.UserReservation;
import com.example.mobile_app.models.UserUpdateModel;
import com.example.mobile_app.response.CommanResponse;
import com.example.mobile_app.response.RegistrationResponse;
import com.example.mobile_app.response.TrainScheduleResponse;
import com.example.mobile_app.response.UserReservationResponse;
import com.example.mobile_app.service.ReservationService;
import com.example.mobile_app.service.TrainScheduleService;
import com.example.mobile_app.utilities.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReservationManager {

    private static ReservationManager singleton;
    private ReservationService reservationService;

    public static ReservationManager getInstance() {
        if (singleton == null)
            singleton = new ReservationManager();
        return singleton;
    }

    private ReservationManager() {
        reservationService = NetworkManager.getInstance().createService(ReservationService.class);
    }

    public void addNewReservation(
            String token,
            NewReservation reservation,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }
        reservationService.addReservation(token, reservation)
                .enqueue(new Callback<CommanResponse>() {
                    @Override
                    public void onResponse(Call<CommanResponse> call, Response<CommanResponse> response) {
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<CommanResponse> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }

    public void fetchReservationList(
            String userToken,
            Consumer<UserReservationResponse> onSuccess,
            Consumer<String> onError
    ) {
        if (!NetworkManager.getInstance().isNetworkAvailable()) {
            onError.accept("No internet connectivity");
            return;
        }

        reservationService.fetchUserReservations(userToken).enqueue(new Callback<UserReservationResponse>() {
            @Override
            public void onResponse(Call<UserReservationResponse> call, Response<UserReservationResponse> response) {
                if (response.isSuccessful()) {
                    UserReservationResponse userReservationResponse = response.body();
                    if (userReservationResponse != null) {
                        onSuccess.accept(userReservationResponse);
                    } else {
                        onError.accept("Response is empty");
                    }
                } else {
                    onError.accept("Request failed with status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<UserReservationResponse> call, Throwable t) {
                Log.d("MyApp", "This is a debug message." + t.getMessage());
                onError.accept("Network request failed: " + t.getMessage());
            }
        });
    }

    public void deleteUserReservation(
            String token,
            String id,
            Runnable onSuccess,
            Consumer<String> onError
    ){
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }

        reservationService.deleteUserReservation(token, id)
                .enqueue(new Callback<CommanResponse>() {
                    @Override
                    public void onResponse(Call<CommanResponse> call, Response<CommanResponse> response) {
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        }else{
                            onError.accept("Cannot delete the reservation now");
                        }
                    }

                    @Override
                    public void onFailure(Call<CommanResponse> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }

    public void updateReservation(
            String token,
            int noOfPassengers,
            int mobile,
            Runnable onSuccess,
            Consumer<String> onError
    ) {
        if (!NetworkManager.getInstance().isNetworkAvailable()) {
            onError.accept("No internet connectivity");
            return;
        }

        String encodedJsonStr;
        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject();
            jsonObject.put("noOfPassengers", noOfPassengers);

            String jsonStr = jsonObject.toString();
            encodedJsonStr = URLEncoder.encode(jsonStr, "UTF-8");

        } catch (JSONException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }


        reservationService.updateReservation(token, jsonObject)
                .enqueue(new Callback<CommanResponse>() {
                    @Override
                    public void onResponse(Call<CommanResponse> call, Response<CommanResponse> response) {
                        if (response.body() != null && response.body().id != null) {
                            onSuccess.run();
                        } else {
                            onError.accept("Something Went wrong");
                        }
                    }

                    @Override
                    public void onFailure(Call<CommanResponse> call, Throwable t) {
                        onError.accept("Unknown :" + t.getMessage());
                    }
                });
    }

}
