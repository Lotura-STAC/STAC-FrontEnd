import styled from "styled-components";

export const Spinner = () => {
  return (
    <Wrapper>
      <span />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.translucent};

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  z-index: 100;

  span {
    position: absolute;

    width: 48px;
    height: 48px;

    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.background1};
    border-top: 3px solid ${({ theme }) => theme.colors.translucent};

    ${({ theme }) => theme.animations.spin}

    animation: spin 1s linear infinite;
  }
`;
