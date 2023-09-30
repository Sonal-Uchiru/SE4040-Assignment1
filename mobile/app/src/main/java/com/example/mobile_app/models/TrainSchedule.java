package com.example.mobile_app.models;

public class TrainSchedule {
    public String trainId, trainName, model, driverName, contactNumber, startingStation, endingStation, depatureTime, arrivalTime;
    public int numberOfSeats, frequency;
    public float price;

    public TrainSchedule(String trainId, String trainName, String model, String driverName, String contactNumber, String startingStation, String endingStation, String depatureTime, String arrivalTime, int numberOfSeats, int frequency, float price) {
        this.trainId = trainId;
        this.trainName = trainName;
        this.model = model;
        this.driverName = driverName;
        this.contactNumber = contactNumber;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.depatureTime = depatureTime;
        this.arrivalTime = arrivalTime;
        this.numberOfSeats = numberOfSeats;
        this.frequency = frequency;
        this.price = price;
    }
}
