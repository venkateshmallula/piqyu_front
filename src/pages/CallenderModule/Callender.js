import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, useMediaQuery } from "@chakra-ui/react";
import Navbar from "../navBar";
import "./callender.css"; // Import the custom CSS file

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <Navbar />
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box
          width={isLargerThanMd ? "600px" : "90%"}
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          bg="white"
        >
          <Calendar onChange={onChange} value={date} />
          <Box mt={4} textAlign="center">
            Selected date: {date.toDateString()}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CalendarComponent;
