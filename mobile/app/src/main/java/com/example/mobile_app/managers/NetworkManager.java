package com.example.mobile_app.managers;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.Toast;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkManager {
    private static NetworkManager singleton;

    private Retrofit retrofit;
    private final String baseUrl = "http://192.168.1.4:7142/api/v1/"; //http://192.168.8.184:5040/
    private ConnectivityManager connectivityManager;

    public static NetworkManager getInstance(){
        // Check if the 'singleton' instance is null
        if (singleton == null)
            singleton = new NetworkManager();

        //Returing instance
        return singleton;
    }

    private NetworkManager(){
        // Create a Retrofit instance with the specified base URL
        retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public <T> T createService(Class<T> serviceClass)
    {
        // Create and return a service interface
        return retrofit.create(serviceClass);
    }

    public boolean isNetworkAvailable(){
        // Get the application context
        Context context = ContextManager.getInstance().getApplicationContext();

        // Initialize the connectivity manager
        if (connectivityManager == null) {
            connectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
        }

        // Check if a network connection is available
        NetworkInfo info = connectivityManager.getActiveNetworkInfo();
        boolean available = info != null && info.isConnectedOrConnecting();

        // Display a toast message if network is not available
        if (!available){
            Toast.makeText(context, "Please connect to the internet and retry", Toast.LENGTH_LONG).show();
        }

        return available;
    }


}

