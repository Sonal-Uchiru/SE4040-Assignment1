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

    UserReservation userReservation;
    Date currentDate = new Date();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        Context context = requireContext();

        tokenManager = new TokenManager(requireContext());
        binding = FragmentReservationFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        reservationManager = ReservationManager.getInstance();
        loadTrainScheduleData();

        listAdapter = new UserReservationAdapter(requireContext(), dataList);
        binding.reservationListView.setAdapter(listAdapter);
        binding.reservationListView.setClickable(true);

        binding.reservationListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                UserReservation clickedItem = dataList.get(i);

                showDetailsFragment(clickedItem);
            }
        });


        return view;
    }

    public void showDetailsFragment(UserReservation item) {
        String departureDate = item.getDepartureDate();

        Bundle bundle = new Bundle();
        bundle.putString("reservationId", item.getId());
        bundle.putString("trainName", item.getTrainName());
        bundle.putString("departureTime", item.getDepartureTime());
        bundle.putString("arrivalTime", item.getArrivalTime());
        bundle.putString("startingStation", item.getStartingStation());
        bundle.putString("endingStation", item.getEndingStation());
        bundle.putInt("reservedSeats", item.getNoOfPassengers());
//        bundle.putFloat("totalPrice", item.getTotalPrice());
        bundle.putDouble("perPersonPrice", item.getPerPersonPrice());
        bundle.putString("departureDate", departureDate);

        // Date departureDate;
        ReservationDetailsFragement fragment = new ReservationDetailsFragement();
        fragment.setArguments(bundle);

        requireActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout, fragment)
                .addToBackStack(null)
                .commit();
    }

    private void loadTrainScheduleData() {
        String token = "Bearer " + tokenManager.getToken();

        reservationManager.fetchReservationList(
                token,
                userReservationResponse -> {
                    List<UserReservation> entries = userReservationResponse.getItems();
                    for (UserReservation entry : entries) {
                        dataList.add(entry);
                    }
                    listAdapter.notifyDataSetChanged();
                },
                error -> handleFailed(error)
        );
    }
    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }
}