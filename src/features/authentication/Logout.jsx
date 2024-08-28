import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logout, isLoading: isLoggingOut } = useLogout();
  return (
    <>
      {!isLoggingOut ? (
        <ButtonIcon onClick={() => logout()}>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      ) : (
        <SpinnerMini />
      )}
    </>
  );
}
