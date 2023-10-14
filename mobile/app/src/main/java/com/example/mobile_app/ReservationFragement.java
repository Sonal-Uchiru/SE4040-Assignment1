package com.example.mobile_app;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
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
import com.google.android.material.floatingactionbutton.FloatingActionButton;

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
    ArrayList<UserReservation> dataHolder = new ArrayList<>();


    SearchBottomSheetBinding searchSheetBinding;
    FloatingActionButton bottomSheetBtn;
    Dialog dialog;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        // Initialize the token manager for user authentication.
        tokenManager = new TokenManager(requireContext());

        // Inflate the layout for this fragment and obtain the root view.
        binding = FragmentReservationFragementBinding.inflate(inflater, container, false);
        // Inflate the layout for the search bottom sheet.
        searchSheetBinding = SearchBottomSheetBinding.inflate(inflater, container, false);
        // Initialize the button used to open the search bottom sheet.
        bottomSheetBtn = binding.btnDialogOpen;
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

        bottomSheetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialog();
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
                        dataHolder.add(entry);

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

    private void searchTrainSchedule() {
        // Find EditText views for start station, destination station, and passengers.
        EditText edStartnName = dialog.findViewById(R.id.ed_search_start_station);
        EditText edDestinationName = dialog.findViewById(R.id.ed_search_end_station);
        EditText edPassengers = dialog.findViewById(R.id.ed_search_passengers);

        // Get user input as strings.
        String trainStartingPoint = edStartnName.getText().toString().trim();
        String trainDestinationPoint = edDestinationName.getText().toString().trim();
        String passengers = String.valueOf(edPassengers.getText());
        int noOfPassengers = Integer.parseInt(passengers);

        if(passengers.equals("")){
            // Display a toast message for an empty passenger count.
            Toast.makeText(requireContext(), "Number of pessengers cannot be empty", Toast.LENGTH_LONG).show();
            return;
        }

        // Filter the data list based on user input.
        filterDataList(trainStartingPoint, trainDestinationPoint, noOfPassengers);
        // Notify the adapter that the data list has changed.
        listAdapter.notifyDataSetChanged();

        Toast.makeText(requireContext(), "Searched Successfully", Toast.LENGTH_SHORT).show();
    }

    private void resetSchedules() {
        dataList.clear();

        dataList.addAll(dataHolder);
        if (dataList.isEmpty()) {
            Toast.makeText(requireContext(), "There are no available reservations", Toast.LENGTH_LONG).show();
        }
        listAdapter.notifyDataSetChanged();
        hideDialog();

    }

    private void filterDataList(String trainStartingPoint, String trainDestinationPoint, int noOfPassengers) {
        // Clear the current data list.
        dataList.clear();

        // Create a new list to hold filtered schedules.
        ArrayList<UserReservation> filteredList = new ArrayList<>();
        // Iterate through the original data and add matching schedules to the filtered list.
        for (UserReservation schedule : dataHolder) {
            if (schedule.getStartingStation().toLowerCase().contains(trainStartingPoint.toLowerCase())
                    && schedule.getEndingStation().toLowerCase().contains(trainDestinationPoint.toLowerCase())
                    && schedule.getNoOfPassengers() >= noOfPassengers) {
                filteredList.add(schedule);
            }
        }
        // Add the filtered schedules back to the main data list.
        dataList.addAll(filteredList);

        // Check if there are no schedules matching the criteria and display a toast message.
        if (dataList.isEmpty()) {
            Toast.makeText(requireContext(), "There are no available reservations", Toast.LENGTH_LONG).show();
        }
    }


    private void showDialog() {
        Context context = requireContext();

        // Create a dialog and set its properties.
        dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.search_bottom_sheet);

        // Show the dialog and set its dimensions, background, and animations.
        dialog.show();
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable((Color.TRANSPARENT)));
        dialog.getWindow().getAttributes().windowAnimations = R.style.dialoglAnumation;
        dialog.getWindow().setGravity(Gravity.BOTTOM);

        // Get references to the search and reset buttons in the dialog layout.
        Button searchBtn = dialog.findViewById(R.id.search_btn);
        Button resetBtn = dialog.findViewById(R.id.reset_btn);

        // Set click listeners for the search and reset buttons.
        searchBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                searchTrainSchedule();
            }
        });
        resetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                resetSchedules();
            }
        });
    }

    private void hideDialog() {
        if (dialog != null && dialog.isShowing()) {
            dialog.dismiss();
        }

    }
    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }
}