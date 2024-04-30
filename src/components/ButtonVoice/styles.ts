import styled, { keyframes, css } from 'styled-components'

interface IContainer {
  $active: boolean
}

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
`

const bounceActive = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
`

const shadowActive = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(4, 160, 210, 0.7);
    background-color: rgba(4, 160, 210, 0.7);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(4, 160, 210, 0);
    background-color: rgba(4, 160, 210, 0);
  }
`

export const Container = styled.div<IContainer>`
  border-radius: 500px;
  margin-bottom: 30px;
  ${({ $active }) =>
    $active &&
    css`
      animation: ${shadowActive} 1.5s linear infinite;
    `}
  button {
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 200px;
    background-color: #04a0d2;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0px solid;
    animation: ${bounce} 1.5s ease-in-out infinite;
    transition: all 0.2s linear;
    ${({ $active }) =>
      $active &&
      css`
        animation: ${bounceActive} 1.5s ease-in-out infinite;
      `}
    &:hover {
      opacity: 0.7;
    }
  }
`
