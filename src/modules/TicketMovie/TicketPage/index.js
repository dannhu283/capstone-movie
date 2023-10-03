import styled from "styled-components";

export { default } from "./TicketPage";

export const GridCustom = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 6%);
`;

export const ButtonSeat = styled.button`
  text-align: center;
  border-radius: 7px;
  padding: 8px;
  margin: 3px;
  cursor: pointer;
  border: 1px solid white;
`;
