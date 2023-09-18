import styled from "@emotion/styled";
export { default } from "./Showing";

export const ButtonBuy = styled.button`
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid #3ae374;
  background-color: #3ae374;
  color: #3d3d3d;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ff9f1a;
    border: 2px dashed #ff9f1a;
  }
`;
