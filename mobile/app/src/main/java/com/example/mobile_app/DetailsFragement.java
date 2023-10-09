package com.example.mobile_app;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.text.Editable;
import android.text.InputFilter;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;

public class DetailsFragement extends Fragment {

    FragmentDetailsFragementBinding binding;
    Bundle args;
    EditText dEdPersons;
    TextView dTotalPrice;
    Double totalPrice = 0.0;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        binding = FragmentDetailsFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        dEdPersons = view.findViewById(R.id.d_ed_persons);
        dTotalPrice = view.findViewById(R.id.d_totalprice);

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
            String trainName = args.getString("trainName");
            String driverName = args.getString("driverName");
            String startingStation = args.getString("startingStation");
            String endingStation = args.getString("endingStation");
            String depatureTime = args.getString("depatureTime");
            String arrivalTime = args.getString("arrivalTime");
            String model = args.getString("model");
            String frequency = args.getString("frequency");

            int numberOfSeats = args.getInt("numberOfSeats");
            int contact = args.getInt("contactNumber");
            String contactStr = Integer.toString(contact);

            double price = args.getDouble("price");
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

        return view;
    }

    private void calculateTotal(int tickets){
        double price = args.getDouble("price");
        totalPrice = price * tickets;

    }
}