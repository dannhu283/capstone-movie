import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelect = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      //Check seat is selected or not
      const isSeatSelected = prevSelectedSeats.some(
        (item) => item.maGhe === seat.maGhe
      );

      // If a seat is already selected, remove it from the array and subtract that seat's ticket price from the total ticket price
      if (isSeatSelected) {
        const newSelectedSeats = prevSelectedSeats.filter(
          (item) => item.maGhe !== seat.maGhe
        );
        const seatPrice = seat.giaVe || 0; // Giá vé của ghế
        setTotalPrice((prevTotalPrice) => prevTotalPrice - seatPrice);
        return newSelectedSeats;
      } else {
        // If the seat is not selected, add it to the array and add the ticket price of that seat to the total ticket price
        const newSelectedSeats = [...prevSelectedSeats, seat];
        const seatPrice = seat.giaVe || 0;
        setTotalPrice((prevTotalPrice) => prevTotalPrice + seatPrice);
        return newSelectedSeats;
      }
    });
  };

  const removeSeat = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      // Filter out seats other than the seats to be deleted
      const newSelectedSeats = prevSelectedSeats.filter(
        (item) => item.maGhe !== seat.maGhe
      );

      //Subtract the ticket price of the removed seat from the total ticket price
      const seatPrice = seat.giaVe || 0;
      setTotalPrice((prevTotalPrice) => prevTotalPrice - seatPrice);

      return newSelectedSeats;
    });
  };

  return (
    <TicketContext.Provider
      value={{ selectedSeats, totalPrice, handleSelect, removeSeat }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const value = useContext(TicketContext);
  return value;
};

export default TicketProvider;
