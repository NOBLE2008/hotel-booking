import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 10rem 2rem 9rem 7rem 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const navigate = useNavigate()
  return (
    <StyledTodayItem>
      {activity?.status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}
      <Flag
        src={activity.guests.countryFlag}
        alt={`Flag of ${activity.guests.countryName}`}
      />
      <Guest>{activity.guests.fullName}</Guest>
      <div>{activity.numNights} nights</div>
      {activity.status === "unconfirmed" ? (
        <Button
          size="small"
          variation="primary"
          style={{ fontSize: "0.8rem" }}
          onClick={() => navigate(`/bookings/${activity.id}`)}
        >
          Check in
        </Button>
      ) : (
        <Button
          size="small"
          variation="primary"
          style={{ fontSize: "0.7rem" }}
          onClick={() => navigate(`/bookings/${activity.id}`)}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}
