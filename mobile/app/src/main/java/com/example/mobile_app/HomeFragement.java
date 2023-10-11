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
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.databinding.SearchBottomSheetBinding;
import com.example.mobile_app.managers.LoginManager;
import com.example.mobile_app.managers.TrainScheduleManager;
import com.example.mobile_app.models.TrainSchedule;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class HomeFragement extends Fragment {

    private TrainScheduleManager trainScheduleManager;
    FragmentHomeFragementBinding binding;
    SearchBottomSheetBinding searchSheetBinding;
    TrainScheduleAdapter listAdapter;
    ArrayList<TrainSchedule> dataList = new ArrayList<>();
    ArrayList<TrainSchedule> dataHolder = new ArrayList<>();

    FloatingActionButton bottomSheetBtn;
    Dialog dialog;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        // Inflate the layout for the HomeFragment.
        binding = FragmentHomeFragementBinding.inflate(inflater, container, false);
        // Inflate the layout for the search bottom sheet.
        searchSheetBinding = SearchBottomSheetBinding.inflate(inflater, container, false);
        // Initialize the button used to open the search bottom sheet.
        bottomSheetBtn = binding.btnDialogOpen;
        View view = binding.getRoot();

        // Initialize the TrainScheduleManager to manage train schedule data.
        trainScheduleManager = TrainScheduleManager.getInstance();
        // Load train schedule data.
        loadTrainScheduleData();

        // Create a TrainScheduleAdapter and set it to the ListView.
        listAdapter = new TrainScheduleAdapter(requireContext(), dataList);
        binding.listView.setAdapter(listAdapter);
        binding.listView.setClickable(true);

        // Set an event listener to open the search bottom sheet when the button is clicked.
        bottomSheetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialog();
            }
        });

        // Set an event listener for item clicks in the ListView to show details of the selected train schedule.
        binding.listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                TrainSchedule clickedItem = dataList.get(i);

                showDetailsFragment(clickedItem);
            }
        });

        // Return the root view of the fragment.
        return view;
    }

    public void showDetailsFragment(TrainSchedule item) {
        // Create a Bundle to pass data to the DetailsFragment.
        Bundle bundle = new Bundle();
        bundle.putString("trainId", item.getId());
        bundle.putString("trainName", item.getName());
        bundle.putString("driverName", item.getDriverName());
        bundle.putInt("contactNumber", item.getContact());
        bundle.putString("startingStation", item.getStartingStation());
        bundle.putString("endingStation", item.getEndingStation());
        bundle.putString("depatureTime", item.getDepartureTime());
        bundle.putString("arrivalTime", item.getArrivalTime());
        bundle.putString("frequency", item.getFrequency());
        bundle.putString("model", item.getModel());
        bundle.putDouble("price", item.getPrice());
        bundle.putInt("noOfSeats", item.getNoOfSeats());

        // Create a DetailsFragment and set the arguments using the Bundle.
        DetailsFragement fragment = new DetailsFragement();
        fragment.setArguments(bundle);

        // Replace the current fragment with the DetailsFragment, allowing navigation back to the previous fragment.
        requireActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout, fragment)
                .addToBackStack(null)
                .commit();
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
            Toast.makeText(requireContext(), "There are no available schedules", Toast.LENGTH_LONG).show();
        }
        listAdapter.notifyDataSetChanged();
        hideDialog();

    }

    private void filterDataList(String trainStartingPoint, String trainDestinationPoint, int noOfPassengers) {
        // Clear the current data list.
        dataList.clear();

        // Create a new list to hold filtered schedules.
        ArrayList<TrainSchedule> filteredList = new ArrayList<>();
        // Iterate through the original data and add matching schedules to the filtered list.
        for (TrainSchedule schedule : dataHolder) {
            if (schedule.getStartingStation().toLowerCase().contains(trainStartingPoint.toLowerCase())
                    && schedule.getEndingStation().toLowerCase().contains(trainDestinationPoint.toLowerCase())
                    && schedule.getNoOfSeats() >= noOfPassengers) {
                filteredList.add(schedule);
            }
        }
        // Add the filtered schedules back to the main data list.
        dataList.addAll(filteredList);

        // Check if there are no schedules matching the criteria and display a toast message.
        if (dataList.isEmpty()) {
            Toast.makeText(requireContext(), "There are no available schedules", Toast.LENGTH_LONG).show();
        }
    }

    private void loadTrainScheduleData() {
        trainScheduleManager.fetchList(
                trainScheduleResponse -> {
                    // Retrieve the list of train schedules from the response.
                    List<TrainSchedule> entries = trainScheduleResponse.getItems();

                    // Add schedules to the data list and data holder.
                    for (TrainSchedule entry : entries) {
                        dataList.add(entry);
                        dataHolder.add(entry);
                    }
                    // Check if the data list is empty and display a toast message if there are no schedules.
                    if (dataList.isEmpty()) {
                        Toast.makeText(requireContext(), "There are no available schedules", Toast.LENGTH_LONG).show();
                    }
                    // Notify the adapter that the data has changed.
                    listAdapter.notifyDataSetChanged();
                },
                error -> handleFailed(error)
        );
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