import styled from "@emotion/styled";

export { default } from "./CreateShowtimes";

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #192a56;
`;

export const ModalSuccess = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 400px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;
