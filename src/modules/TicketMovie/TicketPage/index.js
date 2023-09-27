import styled from "styled-components";

export { default } from "./TicketPage";

export const GridCustom = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 6%);

  //responsive
  @media (max-width: 768px) {
    grid-template-columns: repeat(8, 12%);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 24%);
  }
`;

export const ButtonSeat = styled.button`
  text-align: center;
  border-radius: 7px;
  padding: 10px;
  margin: 3px;
  cursor: pointer;
  border: 1px solid white;
`;
