function Passengers() {

    function checkFlightCapacity(flightCapacity, passengersNumber) {

        let totalPassengers = 0;
        let passengers;

        for (passengers of passengersNumber) {
            totalPassengers += passengers
        }
        if (totalPassengers > flightCapacity) {
            throw new Error("There are to many passengers")
        }


        return totalPassengers;
    }



    function distributeAllSeatsToAllPassengers(VIPpassengers, regularPassengers, nrOfFlights, businessSeatsPerFlight,
        economySeatsPerFlight) {

        let vipPassengersWithBusinessSeats = 0,
            vipPassengersWithEconomySeats = 0,
            regularPassengersWithBusinessSeats = 0,
            regularPassengersWithEconomySeats = 0;

        let availableBusinessSeats = nrOfFlights * businessSeatsPerFlight;
        let availableEconemySeats = nrOfFlights * economySeatsPerFlight;

        var vipBusinessConfiguration = {
            passengers: VIPpassengers,
            seats: availableBusinessSeats
        }
        vipPassengersWithBusinessSeats = updateConfiguration(vipBusinessConfiguration, businessSeatsPerFlight);

        var vipEconomyConfiguration = {
            passengers: vipBusinessConfiguration.passengers,
            seats: availableEconemySeats
        };
        vipPassengersWithEconomySeats = updateConfiguration(vipEconomyConfiguration, economySeatsPerFlight);


        var regularBusinessConfiguration = {
            passengers: regularPassengers,
            seats: vipBusinessConfiguration.seats
        };
        regularPassengersWithBusinessSeats = updateConfiguration(regularBusinessConfiguration, businessSeatsPerFlight);


        var regularEconomyConfiguration = {
            passengers: regularEconomyConfiguration.passengers,
            seats: vipEconomyConfiguration.seats
        };
        regularPassengersWithEconomySeats = updateConfiguration(regularEconomyConfiguration, economySeatsPerFlight);

        return {
            vipPassengersWithBusinessSeats: vipPassengersWithBusinessSeats,
            vipPassengersWithEconomySeats: vipPassengersWithEconomySeats,
            regularPassengersWithBusinessSeats: regularPassengersWithBusinessSeats,
            regularPassengersWithEconomySeats: regularPassengersWithEconomySeats
        };
    }

    function updateConfiguration(configuration, seatsPerFlight) {
        let passengersWithseats = 0;


        while (configuration.passengers > 0) {
            if (configuration.seats > 0) {
                if (configuration.passengers >= configuration.seats) {
                    if (configuration.seats > configuration.seatsPerFlight) {
                        configuration.passengers -= seatsPerFlight;
                        passengersWithseats += seatsPerFlight;
                    } else {
                        configuration.passengers -= configuration.seats;
                        passengersWithseats += configuration.seats;
                        configuration.seats = 0;
                    }
                } else {
                    passengersWithseats += configuration.passengers;
                    configuration.seats -= configuration.passengers,
                        configuration.passengers = 0;
                }
            } else {
                break;
            }
        }
        return passengersWithseats;
    }

    return {
        checkFlightCapacity,
        distributeAllSeatsToAllPassengers
    }


}

module.exports = Passengers();