package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.mobile_app.utilities.TokenManager;

public class ProfileFragement extends Fragment {

    TokenManager tokenManager;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {

        tokenManager = new TokenManager(requireContext());

        String userId = tokenManager.getUserId();
        Log.d("MyApp", "Activity created." + userId); // Debug message

        return inflater.inflate(R.layout.fragment_profile_fragement, container, false);
    }
}