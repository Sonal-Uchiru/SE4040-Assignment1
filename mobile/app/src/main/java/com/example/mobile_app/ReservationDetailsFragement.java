package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentReservationDetailsFragementBinding;

import java.util.Date;

public class ReservationDetailsFragement extends Fragment {

    FragmentReservationDetailsFragementBinding binding;
    Button cancelBtn, updateBtn;

    String reservationId, trainName, departureTime, arrivalTime, startingStation, endingStation, departureDate;
    int reservedSeats;
    float totalPrice, perPersonPrice;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        binding = FragmentReservationDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        updateBtn = view.findViewById(R.id.cancel_reservation);
        cancelBtn = view.findViewById(R.id.update_reservation);

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
//        userManager.toggleUserAccount(
//                userId,
//                () -> handleToggleSuccess(),
//                error -> handleFailed(error));
    }

    private void cancelReservation() {
//        userManager.toggleUserAccount(
//                userId,
//                () -> handleToggleSuccess(),
//                error -> handleFailed(error));
    }
}