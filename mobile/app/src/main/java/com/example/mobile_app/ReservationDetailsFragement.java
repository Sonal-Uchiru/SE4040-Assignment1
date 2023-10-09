package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentReservationDetailsFragementBinding;
import com.example.mobile_app.managers.ReservationManager;
import com.example.mobile_app.utilities.TokenManager;

import java.util.Date;

public class ReservationDetailsFragement extends Fragment {

    FragmentReservationDetailsFragementBinding binding;
    Button cancelBtn, updateBtn;
    private ReservationManager reservationManager;
    TokenManager tokenManager;


    String reservationId, trainName, departureTime, arrivalTime, startingStation, endingStation, departureDate;
    int reservedSeats;
    float totalPrice, perPersonPrice;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        binding = FragmentReservationDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();
        reservationManager = ReservationManager.getInstance();
        tokenManager = new TokenManager(requireContext());

        updateBtn = view.findViewById(R.id.update_reservation);
        cancelBtn = view.findViewById(R.id.cancel_reservation);

        updateBtn.setOnClickListener(v -> {
            updateReservation();
        });
        cancelBtn.setOnClickListener(v -> {
            cancelReservation();
        });
        Bundle args = getArguments();
        if (args != null) {
            reservationId = args.getString("reservationId");
            trainName = args.getString("trainName");
            departureTime = args.getString("departureTime");
            arrivalTime = args.getString("arrivalTime");
            startingStation = args.getString("startingStation");
            endingStation = args.getString("endingStation");
            departureDate = args.getString("departureDate");
            reservedSeats = args.getInt("reservedSeats");
            totalPrice = args.getFloat("totalPrice");
            perPersonPrice = args.getFloat("perPersonPrice");

            binding.rDetailsScheduleDate.setText(departureDate);
            binding.rDetailsTrainName.setText(trainName);
            binding.rDetailsDepartureTime.setText(departureTime);
            binding.rDetailsArrivalTime.setText(arrivalTime);
            binding.rDetailsStartingStation.setText(startingStation);
            binding.rDetailsEndingStation.setText(endingStation);
            binding.rDetailsTotalPrice.setText(String.valueOf(totalPrice));
            binding.rDetailsPersonPrice.setText(String.valueOf(perPersonPrice));
        }

        return view;
    }

    private void updateReservation() {
        String token = "Bearer " + tokenManager.getToken();

//        userManager.toggleUserAccount(
//                userId,
//                () -> handleToggleSuccess(),
//                error -> handleFailed(error));
    }

    private void cancelReservation() {
        String token = "Bearer " + tokenManager.getToken();
        reservationManager.deleteUserReservation(
                token,
                reservationId,
                () -> handleSuccess(),
                error -> handleFailed(error));
    }

    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }

    private void handleSuccess(){
        Toast.makeText(requireContext(), "Reservation cancelled sucessfully", Toast.LENGTH_LONG).show();
        ReservationFragement reservationFragement = new ReservationFragement();
        replaceFragement(reservationFragement);
    }

    private void replaceFragement(Fragment fragment) {
        FragmentManager fragmentManager = requireActivity().getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frame_layout, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }
}