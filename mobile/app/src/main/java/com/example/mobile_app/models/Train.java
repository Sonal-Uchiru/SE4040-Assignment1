package com.example.mobile_app.models;

public class Train {
    public String id, trainName, model, driverName, contactNumber, startingStation, endingStation;
    public int numberOfSeats;
    public Train(String id, String trainName, String model, String driverName, String contactNumber, String startingStation, String endingStation, int numberOfSeats) {
        this.id = id;
        this.trainName = trainName;
        this.model = model;
        this.driverName = driverName;
        this.contactNumber = contactNumber;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.numberOfSeats = numberOfSeats;
    }

}
