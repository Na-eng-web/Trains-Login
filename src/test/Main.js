import React, { useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Main = () => {
  const [seats, setSeats] = useState(Array(80).fill(false));
  const [numSeats, setNumSeats] = useState(1);
  const toast = useToast();

  const reserveSeats = () => {
    if (numSeats > 7) {
      showToast("Invalid Input", "Number of seats cannot exceed 7.", "warning");
      return;
    }

    const startIndex = findAvailableSeats(numSeats);

    if (startIndex === -1) {
      const a = find(0, 79);
      if (a < numSeats) {
        showToast(
          a <= 0
            ? "Seats are full"
            : "Number of available seats are less than entered",
          a > 0 ? `Only ${a} seats are available` : "",
          "warning"
        );
      } else {
        const newSeats = [...seats];
        const reservedSeats = [];
        let sets = numSeats;

        for (let i = 0; i < 80; i++) {
          if (newSeats[i] == false && sets > 0) {
            newSeats[i] = true;
            reservedSeats.push(i + 1);
            sets--;
          }
        }

        setSeats(newSeats);
        showToast(
          "Seats Reserved",
          `Seats ${reservedSeats.join(", ")} have been reserved.`,
          "success"
        );
      }
      return;
    }

    const newSeats = [...seats];
    const reservedSeats = [];

    for (let i = startIndex; i < startIndex + numSeats; i++) {
      newSeats[i] = true;
      reservedSeats.push(i + 1);
    }

    setSeats(newSeats);
    showToast(
      "Seats Reserved",
      `Seats ${reservedSeats.join(", ")} have been reserved.`,
      "success"
    );
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const findAvailableSeats = (numSeats) => {
    for (let i = 0; i < seats.length; i += 7) {
      const ans = find(i, i + 6);
      if (numSeats <= ans) {
        if (ans < 7) {
          return i == 77 ? 3 - ans + i : 7 - ans + i;
        } else {
          return ans - 7 + i;
        }
      }
    }
    return -1;
  };

  const find = (start, end) => {
    let ans = -1;
    for (let i = start; i <= end; i++) {
      if (!seats[i]) {
        ans += 1;
      }
    }
    return ans + 1;
  };

  return (
    <VStack p={4} spacing={4} alignItems="center">
      <HStack w="100%" justifyContent="center">
        <Input
          flex={1}
          mr={2}
          min={1}
          max={7}
          placeholder="Enter number of seats to book"
          size="md"
          bg="white"
          borderRadius="md"
          _placeholder={{ color: "gray.400" }}
          value={numSeats}
          onChange={(e) => setNumSeats(Number(e.target.value))}
        />
        <Button
          colorScheme="teal"
          size="md"
          px={8}
          borderRadius="md"
          _hover={{ bg: "teal.600" }}
          onClick={reserveSeats}
        >
          Submit
        </Button>
      </HStack>
      <Grid
        w={{ base: "100%", md: "50%" }}
        templateColumns="repeat(7, 1fr)"
        gap={4}
        templateRows="repeat(11,1fr)"
      >
        {seats.map((isReserved, index) => (
          <GridItem
            key={index}
            w={{ base: "12", md: "10" }}
            h={{ base: "12", md: "10" }}
            bg={isReserved ? "green.500" : "gray.300"}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="semibold"
            fontSize="md"
            _hover={{ bg: "gray.400" }}
          >
            {index + 1}
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Main;
