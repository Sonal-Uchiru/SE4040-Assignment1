package com.example.mobile_app;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.content.SyncRequest;
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
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.managers.ReservationManager;
import com.example.mobile_app.managers.UserManager;
import com.example.mobile_app.models.NewReservation;
import com.example.mobile_app.utilities.DatabaseTypeConverters;
import com.example.mobile_app.utilities.TokenManager;

import java.util.Calendar;
import java.util.Date;

public class DetailsFragement extends Fragment {

    FragmentDetailsFragementBinding binding;
    TokenManager tokenManager;

    private ReservationManager reservationManager;

    Bundle args;
    EditText dEdPersons;
    TextView dTotalPrice;
    Double totalPrice = 0.0;
    String trainId, trainName, driverName, startingStation, endingStation, depatureTime, arrivalTime, model, frequency;
    int numberOfSeats, contact;
    int noOfPassengers;
    double price;
    Date currentDate = new Date();
    Button btnBookTicket;
    private Button pickDateBtn;
    private TextView selectedDateTV;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        binding = FragmentDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();
        btnBookTicket = view.findViewById(R.id.book_ticket_btn);

        tokenManager = new TokenManager(requireContext());
        reservationManager = ReservationManager.getInstance();
        dEdPersons = view.findViewById(R.id.d_ed_persons);
        dTotalPrice = view.findViewById(R.id.d_totalprice);
        pickDateBtn = view.findViewById(R.id.idBtnPickDate);
        selectedDateTV = view.findViewById(R.id.d_selected_date);

        pickDateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // on below line we are getting
                // the instance of our calendar.
                final Calendar c = Calendar.getInstance();

                // on below line we are getting
                // our day, month and year.
                int year = c.get(Calendar.YEAR);
                int month = c.get(Calendar.MONTH);
                int day = c.get(Calendar.DAY_OF_MONTH);

                // on below line we are creating a variable for date picker dialog.
                DatePickerDialog datePickerDialog = new DatePickerDialog(
                        // on below line we are passing context.
                        requireContext(),
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker view, int year,
                                                  int monthOfYear, int dayOfMonth) {
                                // on below line we are setting date to our text view.
                                selectedDateTV.setText(dayOfMonth + "-" + (monthOfYear + 1) + "-" + year);

                            }
                        },
                        // on below line we are passing year,
                        // month and day for selected date in our date picker.
                        year, month, day);
                // at last we are calling show to
                // display our date picker dialog.
                datePickerDialog.show();
            }
        });

        dEdPersons.setFilters(new InputFilter[] {new InputFilter.LengthFilter(5)});
        dEdPersons.setText("1");

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

        args = getArguments();
        if (args != null) {
            trainId = args.getString("trainId");
            trainName = args.getString("trainName");
            driverName = args.getString("driverName");
            startingStation = args.getString("startingStation");
            endingStation = args.getString("endingStation");
            depatureTime = args.getString("depatureTime");
            arrivalTime = args.getString("arrivalTime");
            model = args.getString("model");
            frequency = args.getString("frequency");

            numberOfSeats = args.getInt("numberOfSeats");
            contact = args.getInt("contactNumber");
            String contactStr = Integer.toString(contact);

            price = args.getDouble("price");
            String priceStr = Double.toString(price);

            Log.d("MyApp", "Activity created." + driverName); // Debug message
            binding.trainName.setText(trainName);
            binding.dDriver.setText(driverName);
            binding.dModel.setText(model);
            binding.dContact.setText(contactStr);
            binding.dStartingstation.setText(startingStation);
            binding.dEndingstation.setText(endingStation);
            binding.dDeparturetime.setText(depatureTime);
            binding.dArrivaltime.setText(arrivalTime);
            binding.dPersonprice.setText(priceStr);
            binding.dTotalprice.setText(priceStr);

            // binding.model.setText(model);
        }

        btnBookTicket.setOnClickListener(v -> {
            addNewReservation();
        });
        return view;
    }

    private void addNewReservation() {
        String token = "Bearer " + tokenManager.getToken();
        String passengers = String.valueOf(dEdPersons.getText());
        String selectedDate = String.valueOf(selectedDateTV.getText());
        String formattedDate = DatabaseTypeConverters.formatToDateTime(selectedDate);
        int noOfPassengers = Integer.parseInt(passengers);

        Log.d("MyApp", "Activity created." + selectedDate);
        if(selectedDate.equals("Reservation Date")){
            Toast.makeText(requireContext(), "Please select a valid reservation date", Toast.LENGTH_LONG).show();
            return;
        }
        NewReservation reservation = new NewReservation(trainId, trainName, startingStation, endingStation, frequency, depatureTime, arrivalTime, noOfPassengers, formattedDate, price);

        reservationManager.addNewReservation(
                token,
                reservation,
                () -> handleSuccess(),
                error -> handleFailed(error));
    }

    private void calculateTotal(int tickets){
        double price = args.getDouble("price");
        totalPrice = price * tickets;

    }

    private void handleSuccess(){
        Toast.makeText(requireContext(), "Ticket booked sucessfully", Toast.LENGTH_LONG).show();
        HomeFragement homeFragement = new HomeFragement();
        replaceFragement(homeFragement);
    }
    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }

    private void replaceFragement(Fragment fragment) {
        FragmentManager fragmentManager = requireActivity().getSupportFragmentManager();

        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.replace(R.id.frame_layout, fragment);

        fragmentTransaction.addToBackStack(null);

        fragmentTransaction.commit();
    }

}