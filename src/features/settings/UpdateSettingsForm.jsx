import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSetting";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { isUpdating, updateSetting } = useUpdateSettings();
  const {
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => {
            if(Number(e.target.value) !== minBookingLength){
              console.log(e.target.value, minBookingLength);
              updateSetting({ ["minBookingLength"]: e.target.value });
            }
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => {
            if (Number(e.target.value) !== maxBookingLength) {
              updateSetting({ ["maxBookingLength"]: e.target.value });
            }
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => {
            if (Number(e.target.value) !== maxGuestPerBooking) {
              updateSetting({ ["maxGuestPerBooking"]: e.target.value });
            }
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => {
            if (Number(e.target.value) !== breakfastPrice) {
              updateSetting({ ["breakfastPrice"]: e.target.value });
            }
          }}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
