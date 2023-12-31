import styled from "@emotion/styled";

export { default } from "./Showtimes";

export const ShowTime = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  min-height: 30vh;
  width: 80%;
  margin: 5% 0 0 5%;

  @media screen and (max-width: 599.98px) {
    width: auto;
    margin: 0;
  }
`;

export const DivNote = styled.div`
  color: #ff9f1a;
  display: flex;
  flex-direction: column;
`;
