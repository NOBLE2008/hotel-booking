import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setConfirmed] = useState(false);
  const moveBack = useMoveBack();

  const { booking = {}, isLoading } = useBooking();

  const { data: { breakfastPrice } = {}, isLoading: isLoadingSettings } =
    useSettings();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;
  const [isBreakFast, setIsBreakFast] = useState(hasBreakfast);
  const [price, setPrice] = useState(status === "checked-in" ? 0 : totalPrice);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [readyToConfirm, setReadyToConfirm] = useState(false);
  useEffect(() => {
    setPrice(status === "checked-in" ? 0 : totalPrice);
    setIsBreakFast(hasBreakfast);
  }, [totalPrice, status, hasBreakfast]);

  useEffect(() => {
    if (isBreakFast && hasInteracted) {
      setPrice((prevPrice) => prevPrice + breakfastPrice);
    }
    if (
      !isBreakFast &&
      hasBreakfast &&
      status !== "checked-in" &&
      hasInteracted
    ) {
      setPrice((prevPrice) => prevPrice - breakfastPrice);
    }
  }, [isBreakFast, breakfastPrice, hasBreakfast, status, hasInteracted]);

  useEffect(() => {
    if (hasBreakfast) {
      setPrice((prevPrice) => prevPrice + breakfastPrice);
    }
  }, [hasBreakfast, breakfastPrice]);

  const queryClient = useQueryClient();
  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationKey: "checkin",
    mutationFn: () =>
      updateBookingApi(bookingId, {
        isPaid: true,
        status: "checked-in",
        hasBreakfast: isBreakFast,
        totalPrice:
          (hasBreakfast && isBreakFast) || (!hasBreakfast && !isBreakFast)
            ? totalPrice
            : price,
      }),
    onSuccess: () => {
      toast.success("Booking updated successfully");
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries(["booking"]);
      moveBack();
    },
    onError: (error) => toast.error("Failed to check in booking"),
  });

  function handleCheckin() {
    if (confirmed === true) {
      updateBooking();
    }
  }

  function handleConfirm() {
    setConfirmed(true);
  }
  function handleAddBreakfast(e) {
    setIsBreakFast(!isBreakFast);
    setHasInteracted(true);

    setReadyToConfirm((cur) => !cur);
  }
  if (isLoading || isUpdating || isLoadingSettings) {
    return <Spinner />;
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox checked={isBreakFast} onChange={handleAddBreakfast}>
          Want to add breakfast for {formatCurrency(breakfastPrice)}?
        </Checkbox>
      </Box>
      <Box>
        {(status === "unconfirmed" || readyToConfirm) && (
          <Checkbox onChange={handleConfirm} disabled={confirmed === true}>
            I confirm that {guests.fullName} has paid the total amount:{" "}
            {formatCurrency(Number(price))}
          </Checkbox>
        )}
      </Box>
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={handleCheckin} disabled={confirmed === false}>
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
