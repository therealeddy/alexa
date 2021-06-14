import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #010B14;
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 50px 150px;
  .button-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;