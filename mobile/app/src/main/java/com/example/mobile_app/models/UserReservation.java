package com.example.mobile_app.models;

import java.util.Date;

public class UserReservation {
     String reservationId, trainName, departureTime, arrivalTime, startingStation, endingStation;
     Date departureDate;
     int reservedSeats;
     float totalPrice, perPersonPrice;

    public UserReservation(String reservationId, String trainName, String departureTime, String arrivalTime, String startingStation, String endingStation, Date departureDate, int reservedSeats, float totalPrice, float perPersonPrice) {
        this.reservationId = reservationId;
        this.trainName = trainName;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.departureDate = departureDate;
        this.reservedSeats = reservedSeats;
        this.totalPrice = totalPrice;
        this.perPersonPrice = perPersonPrice;
    }

    public String getReservationId() {
        return reservationId;
    }

    public String getTrainName() {
        return trainName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getStartingStation() {
        return startingStation;
    }

    public String getEndingStation() {
        return endingStation;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public int getReservedSeats() {
        return reservedSeats;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public float getPerPersonPrice() {
        return perPersonPrice;
    }
}
