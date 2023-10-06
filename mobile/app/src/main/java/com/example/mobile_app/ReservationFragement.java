package com.example.mobile_app;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;

import com.example.mobile_app.adapters.TrainScheduleAdapter;
import com.example.mobile_app.adapters.UserReservationAdapter;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.databinding.FragmentReservationFragementBinding;
import com.example.mobile_app.databinding.SearchBottomSheetBinding;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.models.UserReservation;
import com.example.mobile_app.utilities.DatabaseTypeConverters;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class ReservationFragement extends Fragment {

    FragmentReservationFragementBinding binding;
    UserReservationAdapter listAdapter;
    ArrayList<UserReservation> dataList = new ArrayList<>();

    UserReservation userReservation;
    Date currentDate = new Date();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        Context context = requireContext();

        binding = FragmentReservationFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();
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
        Date departureDate = item.getDepartureDate();
        String formattedDate = DatabaseTypeConverters.dateToString(departureDate);

        Bundle bundle = new Bundle();
        bundle.putString("trainName", item.getTrainName());
        bundle.putString("departureTime", item.getDepartureTime());
        bundle.putString("arrivalTime", item.getArrivalTime());
        bundle.putString("startingStation", item.getStartingStation());
        bundle.putString("endingStation", item.getEndingStation());
        bundle.putInt("reservedSeats", item.getReservedSeats());
        bundle.putFloat("totalPrice", item.getTotalPrice());
        bundle.putFloat("perPersonPrice", item.getPerPersonPrice());
        bundle.putString("departureDate", formattedDate);

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
        userReservation = new UserReservation("1", "Sudu Manika", "7.20", "8.20", "Dankotu", "Polonnaru", currentDate,
                5, 500, 100);
        dataList.add(userReservation);
        userReservation = new UserReservation("1", "Kalu Manika", "7.20", "8.20", "Dankotu", "Polonnaru", currentDate,
                5, 500, 100);
        dataList.add(userReservation);
    }
}