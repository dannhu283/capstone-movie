import styled from "@emotion/styled";
export { default } from "./Header";

export const SigninAndSignup = styled.button`
  color: white;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  align-items: center;
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  border-right: ${(props) => props.borderRight};
  transition: all 0.5s;

  &:hover {
    color: #ff9f1a;
    box-shadow: 0px 20px 30px -10px rgb(38, 57, 77);
  }
`;

export const SpanHeader = styled.span`
  margin-left: 5px;
`;
