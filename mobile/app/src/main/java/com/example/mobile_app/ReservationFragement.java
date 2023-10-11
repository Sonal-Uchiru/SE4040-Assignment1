package com.example.mobile_app;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Toast;

import com.example.mobile_app.adapters.TrainScheduleAdapter;
import com.example.mobile_app.adapters.UserReservationAdapter;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.databinding.FragmentReservationFragementBinding;
import com.example.mobile_app.databinding.SearchBottomSheetBinding;
import com.example.mobile_app.managers.ReservationManager;
import com.example.mobile_app.managers.TrainScheduleManager;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.models.UserReservation;
import com.example.mobile_app.utilities.TokenManager;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReservationFragement extends Fragment {

    FragmentReservationFragementBinding binding;
    TokenManager tokenManager;

    private ReservationManager reservationManager;

    UserReservationAdapter listAdapter;
    ArrayList<UserReservation> dataList = new ArrayList<>();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        // Initialize the token manager for user authentication.
        tokenManager = new TokenManager(requireContext());

        // Inflate the layout for this fragment and obtain the root view.
        binding = FragmentReservationFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        // Initialize the reservation manager, which is responsible for managing reservations.
        reservationManager = ReservationManager.getInstance();

        // Load the train schedule data for the reservation.
        loadTrainScheduleData();

        // Create and set the user reservation adapter for the ListView.
        listAdapter = new UserReservationAdapter(requireContext(), dataList);
        binding.reservationListView.setAdapter(listAdapter);
        binding.reservationListView.setClickable(true);

        // Set a click listener for items in the reservation ListView.
        binding.reservationListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                // Retrieve the clicked item from the data list.
                UserReservation clickedItem = dataList.get(i);
                // Show a details fragment for the selected reservation.
                showDetailsFragment(clickedItem);
            }
        });

        return view;
    }

    public void showDetailsFragment(UserReservation item) {
        // Extract the departure date from the selected reservation.
        String departureDate = item.getDepartureDate();

        // Create a bundle to pass reservation details to the details fragment.
        Bundle bundle = new Bundle();
        bundle.putString("reservationId", item.getId());
        bundle.putString("trainName", item.getTrainName());
        bundle.putString("departureTime", item.getDepartureTime());
        bundle.putString("arrivalTime", item.getArrivalTime());
        bundle.putString("startingStation", item.getStartingStation());
        bundle.putString("endingStation", item.getEndingStation());
        bundle.putInt("reservedSeats", item.getNoOfPassengers());
        bundle.putDouble("perPersonPrice", item.getPerPersonPrice());
        bundle.putString("departureDate", departureDate);

        // Create a new ReservationDetailsFragment and set the bundle as its arguments.
        ReservationDetailsFragement fragment = new ReservationDetailsFragement();
        fragment.setArguments(bundle);

        // Replace the current fragment with the details fragment.
        requireActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout, fragment)
                .addToBackStack(null)
                .commit();
    }

    private void loadTrainScheduleData() {
        // Obtain the user's authorization token.
        String token = "Bearer " + tokenManager.getToken();

        // Fetch the list of user reservations using the reservation manager.
        reservationManager.fetchReservationList(
                token,
                userReservationResponse -> {
                    List<UserReservation> entries = userReservationResponse.getItems();
                    for (UserReservation entry : entries) {
                        dataList.add(entry);
                    }
                    if (dataList.isEmpty()) {
                        // Display a message if there are no available reservations.
                        Toast.makeText(requireContext(), "There are no available reservations", Toast.LENGTH_LONG).show();
                    }
                    // Notify the adapter of the data change.
                    listAdapter.notifyDataSetChanged();
                },
                error -> handleFailed(error)
        );
    }
    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }
}