package com.example.mobile_app.models;

import java.util.Date;

public class UserReservation {
     String id, created, modified, trainId, trainName, startingStation, endingStation, departureDate, arrivalTime, departureTime, reservationDate, userId;
     int noOfPassengers;
     double perPersonPrice;
     boolean isEnabled;

    public UserReservation(String id, String created, String modified, String trainId, String trainName, String startingStation, String endingStation, String departureDate, String arrivalTime, String departureTime, String reservationDate, String userId, int noOfPassengers, double perPersonPrice, boolean isEnabled) {
        this.id = id;
        this.created = created;
        this.modified = modified;
        this.trainId = trainId;
        this.trainName = trainName;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.departureDate = departureDate;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.reservationDate = reservationDate;
        this.userId = userId;
        this.noOfPassengers = noOfPassengers;
        this.perPersonPrice = perPersonPrice;
        this.isEnabled = isEnabled;
    }

    public String getId() {
        return id;
    }

    public String getCreated() {
        return created;
    }

    public String getModified() {
        return modified;
    }

    public String getTrainId() {
        return trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public String getStartingStation() {
        return startingStation;
    }

    public String getEndingStation() {
        return endingStation;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public String getUserId() {
        return userId;
    }

    public int getNoOfPassengers() {
        return noOfPassengers;
    }

    public double getPerPersonPrice() {
        return perPersonPrice;
    }

    public boolean isEnabled() {
        return isEnabled;
    }
}
