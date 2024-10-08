import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const [position, setPosition] = useState("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toogle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    openId !== id ? open(id) : close();
    const rect = e.target.getBoundingClientRect();
    console.log(rect)
    console.log(window.innerWidth - rect.x - rect.width)
    setPosition({ x: window.innerWidth - rect.x - rect.width, y: rect.top + rect.height + 8 });
  }
  return (
    <StyledToggle onClick={handleClick}>
      {openId === id ? <HiXMark /> : <HiEllipsisVertical />}
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position } = useContext(MenusContext);
  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}

function Button({ children, onClick }) {
  return (
    <li onClick={onClick}>
      <StyledButton>{children}</StyledButton>
    </li>
  );
}

Menus.Toogle = Toogle;
Menus.List = List;
Menus.Menu = Menu;
Menus.Button = Button;
