import styled from "@emotion/styled";

export { default } from "./Showtimes";

export const ShowTime = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  min-height: 30vh;
  width: 80%;
  margin: 10% 5%;
`;

export const ButtonCustom = styled.button`
  background-color: #ffcccc;
  padding: 10px 15px;
  border: 2px solid #ffcccc;
  border-radius: 7px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 15px;
  &:hover {
    color: #ff3838;
    font-weight: bold;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }
`;

export const DivNote = styled.div`
  color: #ff9f1a;
  display: flex;
  flex-direction: column;
`;
