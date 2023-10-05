import styled from "@emotion/styled";

export { default } from "./Showing";

export const CustomDot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #3d3d3d;
  margin-top: 20px;
  transition: all 0.3;
  &:hover {
    background-color: #3ae374;
  }
`;
