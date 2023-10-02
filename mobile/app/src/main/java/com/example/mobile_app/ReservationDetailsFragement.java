package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentReservationDetailsFragementBinding;

import java.util.Date;

public class ReservationDetailsFragement extends Fragment {

    FragmentReservationDetailsFragementBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = FragmentReservationDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        Bundle args = getArguments();
        if(args != null){
            String reservationId = args.getString("reservationId");
            String trainName = args.getString("trainName");
            String departureTime = args.getString("departureTime");
            String arrivalTime = args.getString("arrivalTime");
            String startingStation = args.getString("startingStation");
            String endingStation = args.getString("endingStation");
            String departureDate = args.getString("departureDate");
            int reservedSeats = args.getInt("reservedSeats");
            float totalPrice = args.getFloat("totalPrice");
            float perPersonPrice = args.getFloat("perPersonPrice");

            binding.rDetailsScheduleDate.setText(departureDate);
            binding.rDetailsTrainName.setText(trainName);
            binding.rDetailsDepartureTime.setText(departureTime);
            binding.rDetailsArrivalTime.setText(arrivalTime);
            binding.rDetailsStartingStation.setText(startingStation);
            binding.rDetailsEndingStation.setText(endingStation);
            binding.rDetailsTotalPrice.setText(String.valueOf(totalPrice));
            binding.rDetailsPersonPrice.setText(String.valueOf(perPersonPrice));

        }

        return view;    }
}