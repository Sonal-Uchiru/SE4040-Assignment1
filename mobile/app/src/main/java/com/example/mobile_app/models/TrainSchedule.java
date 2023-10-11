package com.example.mobile_app.models;

public class TrainSchedule {
    public String id, name, model, driverName, startingStation, endingStation, frequency, arrivalTime, departureTime;
    public int contact, noOfSeats;
    public double price;
    public boolean isEnabled, isReturnTrip;

    public TrainSchedule(String id, String name, String model, String driverName, String startingStation, String endingStation, String frequency, String arrivalTime, String departureTime, int contact, int noOfSeats, double price, boolean isEnabled, boolean isReturnTrip) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.driverName = driverName;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.frequency = frequency;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.contact = contact;
        this.noOfSeats = noOfSeats;
        this.price = price;
        this.isEnabled = isEnabled;
        this.isReturnTrip = isReturnTrip;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getModel() {
        return model;
    }

    public String getDriverName() {
        return driverName;
    }

    public String getStartingStation() {
        return startingStation;
    }

    public String getEndingStation() {
        return endingStation;
    }

    public String getFrequency() {
        return frequency;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public int getContact() {
        return contact;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }

    public double getPrice() {
        return price;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public boolean isReturnTrip() {
        return isReturnTrip;
    }
}
