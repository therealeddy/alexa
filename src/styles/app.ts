import styled from 'styled-components'

interface IStatus {
  $listening: boolean
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #010b14;
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 50px 150px;
`

export const ContentCenter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Status = styled.div<IStatus>`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    display: block;
    border-radius: 100px;
    background-color: ${(props) => (props.$listening ? '#1EC997' : '#E35C6A')};
    margin-left: 10px;
    margin-top: 2px;
  }
`

export const LastTrans = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  gap: 5px;
  b,
  strong {
    font-weight: 400;
  }
`
