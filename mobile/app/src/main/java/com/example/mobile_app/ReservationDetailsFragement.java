package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.text.Editable;
import android.text.InputFilter;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
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
    double perPersonPrice, totalPrice;
    EditText dEdPersons;
    TextView dTotalPrice;
    Bundle args;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        // Inflating the layout and initializing view components.
        binding = FragmentReservationDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        // Initializing necessary managers and views.
        reservationManager = ReservationManager.getInstance();
        tokenManager = new TokenManager(requireContext());
        updateBtn = view.findViewById(R.id.update_reservation);
        cancelBtn = view.findViewById(R.id.cancel_reservation);
        dEdPersons = view.findViewById(R.id.rd_ed_nopersons);
        dTotalPrice = view.findViewById(R.id.r_details_total_price);

        // Set a maximum length for the number of persons input.
        dEdPersons.setFilters(new InputFilter[] {new InputFilter.LengthFilter(5)});

        // Register click listeners for update and cancel buttons.
        updateBtn.setOnClickListener(v -> {
            updateReservation();
        });
        cancelBtn.setOnClickListener(v -> {
            cancelReservation();
        });

        // Retrieve arguments passed to this fragment (reservation details).
        args = getArguments();
        if (args != null) {
            reservationId = args.getString("reservationId");
            trainName = args.getString("trainName");
            departureTime = args.getString("departureTime");
            arrivalTime = args.getString("arrivalTime");
            startingStation = args.getString("startingStation");
            endingStation = args.getString("endingStation");
            departureDate = args.getString("departureDate");
            reservedSeats = args.getInt("reservedSeats");
            totalPrice = args.getDouble("totalPrice");
            perPersonPrice = args.getDouble("perPersonPrice");

            // Display values in the views.
            String reservedSeatsStr = String.valueOf(reservedSeats);
            binding.rDetailsScheduleDate.setText(departureDate);
            binding.rDetailsTrainName.setText(trainName);
            binding.rDetailsDepartureTime.setText(departureTime);
            binding.rDetailsArrivalTime.setText(arrivalTime);
            binding.rDetailsStartingStation.setText(startingStation);
            binding.rDetailsEndingStation.setText(endingStation);
            binding.rDetailsTotalPrice.setText(String.valueOf(totalPrice));
            binding.rDetailsPersonPrice.setText(String.valueOf(perPersonPrice));
            dEdPersons.setText(reservedSeatsStr);

            // Calculate and display the total price based on the number of persons.
            calculateTotal(reservedSeats);
            String totalStr = Double.toString(totalPrice);
            dTotalPrice.setText(totalStr);
        }

        // Register a text change listener for the number of persons input.
        dEdPersons.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String enteredText = s.toString();
                if (!enteredText.isEmpty()) {
                    int enteredNumber = Integer.parseInt(enteredText);
                    calculateTotal(enteredNumber);
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {
                String totalStr = Double.toString(totalPrice);
                dTotalPrice.setText(totalStr);
            }
        });

        return view;
    }

    private void updateReservation() {
        // Obtain the user's authorization token.
        String token = "Bearer " + tokenManager.getToken();
        // Parse the number of persons from the user input.
        int noOfPersons = Integer.parseInt(String.valueOf(dEdPersons.getText()));

        // Call the reservationManager to update the reservation.
        reservationManager.updateReservation(
                reservationId,
                token,
                noOfPersons,
                () -> handleUpdateSuccess(),
                error -> handleFailed(error));
    }

    private void cancelReservation() {
        // Obtain the user's authorization token.
        String token = "Bearer " + tokenManager.getToken();

        // Call the reservationManager to delete the user's reservation.
        reservationManager.deleteUserReservation(
                token,
                reservationId,
                () -> handleSuccess(),
                error -> handleFailed(error));
    }

    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }
    private void handleUpdateSuccess(){
        Toast.makeText(requireContext(), "Reservation updated sucessfully", Toast.LENGTH_LONG).show();
        ReservationFragement reservationFragement = new ReservationFragement();
        replaceFragement(reservationFragement);
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

    private void calculateTotal(int tickets){
        double price = args.getDouble("perPersonPrice");
        totalPrice = price * tickets;

    }
}