package com.example.mobile_app;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;

public class DetailsFragement extends Fragment {

    FragmentDetailsFragementBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        binding = FragmentDetailsFragementBinding.inflate(inflater, container, false);

        View view = binding.getRoot();

        Bundle args = getArguments();
        if (args != null) {
            String trainName = args.getString("trainName");
            String driverName = args.getString("driverNamer");
            String contactNumber = args.getString("contactNumber");
            String startingStation = args.getString("startingStation");
            String endingStation = args.getString("endingStation");
            String depatureTime = args.getString("depatureTime");
            String arrivalTime = args.getString("arrivalTime");
            int numberOfSeats = args.getInt("numberOfSeats");
            String model = args.getString("model");

//            int frequency = args.getInt("frequency");
//            double price = args.getDouble("price");
//            String frequencyStr = Integer.toString(frequency);
//            String priceStr = Double.toString(price);

            binding.trainName.setText(trainName);
            binding.dDriver.setText(driverName);
            binding.dModel.setText(model);
            binding.dContact.setText(contactNumber);
            binding.dStartingstation.setText(startingStation);
            binding.dEndingstation.setText(endingStation);
            binding.dDeparturetime.setText(depatureTime);
            binding.dArrivaltime.setText(arrivalTime);
//            binding.dPersonprice.setText(priceStr);
//            binding.dTotalprice.setText(priceStr);
//            binding.dEdPersons.setText('1');

            // binding.model.setText(model);
        }

        return view;
    }
}