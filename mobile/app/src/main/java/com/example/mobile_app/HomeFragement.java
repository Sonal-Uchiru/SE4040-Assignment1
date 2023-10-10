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

    TrainSchedule trainSchedule;

    FloatingActionButton bottomSheetBtn;
    Dialog dialog;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        Context context = requireContext();
        binding = FragmentHomeFragementBinding.inflate(inflater, container, false);
        searchSheetBinding = SearchBottomSheetBinding.inflate(inflater, container, false);
        bottomSheetBtn = binding.btnDialogOpen;
        View view = binding.getRoot();

        trainScheduleManager = TrainScheduleManager.getInstance();

        loadTrainScheduleData();

        listAdapter = new TrainScheduleAdapter(requireContext(), dataList);
        binding.listView.setAdapter(listAdapter);
        binding.listView.setClickable(true);

        bottomSheetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialog();
            }
        });
        binding.listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                TrainSchedule clickedItem = dataList.get(i);

                showDetailsFragment(clickedItem);
            }
        });
        return view;
    }

    public void showDetailsFragment(TrainSchedule item) {
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

        DetailsFragement fragment = new DetailsFragement();
        fragment.setArguments(bundle);

        requireActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout, fragment)
                .addToBackStack(null)
                .commit();
    }

    private void searchTrainSchedule() {
        EditText edStartnName = dialog.findViewById(R.id.ed_search_start_station);
        EditText edDestinationName = dialog.findViewById(R.id.ed_search_end_station);
        EditText edPassengers = dialog.findViewById(R.id.ed_search_passengers);

        String trainStartingPoint = edStartnName.getText().toString().trim();
        String trainDestinationPoint = edDestinationName.getText().toString().trim();
        int noOfPassengers = Integer.parseInt(edPassengers.getText().toString().trim());

        filterDataList(trainStartingPoint, trainDestinationPoint, noOfPassengers);
        listAdapter.notifyDataSetChanged();

        hideDialog();
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
        dataList.clear();

        ArrayList<TrainSchedule> filteredList = new ArrayList<>();
        for (TrainSchedule schedule : dataHolder) {
            if (schedule.getStartingStation().toLowerCase().contains(trainStartingPoint.toLowerCase())
                    && schedule.getEndingStation().toLowerCase().contains(trainDestinationPoint.toLowerCase())
                    && schedule.getNoOfSeats() >= noOfPassengers) {
                filteredList.add(schedule);
            }
        }
        dataList.addAll(filteredList);
        if (dataList.isEmpty()) {
            Toast.makeText(requireContext(), "There are no available schedules", Toast.LENGTH_LONG).show();
        }
    }

    private void loadTrainScheduleData() {
        trainScheduleManager.fetchList(
                trainScheduleResponse -> {
                    List<TrainSchedule> entries = trainScheduleResponse.getItems();
                    for (TrainSchedule entry : entries) {
                        dataList.add(entry);
                        dataHolder.add(entry);
                    }
                    if (dataList.isEmpty()) {
                        Toast.makeText(requireContext(), "There are no available schedules", Toast.LENGTH_LONG).show();
                    }
                    listAdapter.notifyDataSetChanged();
                },
                error -> handleFailed(error)
        );
    }

    private void showDialog() {
        Context context = requireContext();

        dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.search_bottom_sheet);

        dialog.show();
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable((Color.TRANSPARENT)));
        dialog.getWindow().getAttributes().windowAnimations = R.style.dialoglAnumation;
        dialog.getWindow().setGravity(Gravity.BOTTOM);

        Button searchBtn = dialog.findViewById(R.id.search_btn);
        Button resetBtn = dialog.findViewById(R.id.reset_btn);

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