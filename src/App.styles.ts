import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 60px;
`;

export const IndexContainer = styled.div`
  width: 100%;
  margin: 30px 0;
`;

export const IndexItem = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.titleLG};
  align-self: center;
  margin-bottom: 30px;
`;

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD};
`;

export const FormTitle = styled.h3`
  ${({ theme }) => theme.fonts.titleSM};
  width: fit-content;
  position: relative;
  top: 10px;
  left: 10px;
  padding: 1px 10px;
  background-color: ${({ theme }) => theme.colors.secondaryD1};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 30px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL2};
  & > *:not(button) {
    width: 100%;
    max-width: 220px;
  }
`;

interface ButtonProps {
  color?: string;
  variant?: "filled" | "outlined";
}

export const Button = styled.button<ButtonProps>`
  width: fit-content;
  background-color: ${({ theme, color, variant }) =>
    variant === "outlined" ? "transparent" : color || theme.colors.primary};
  color: ${({ theme, color, variant }) =>
    variant === "outlined"
      ? color || theme.colors.primary
      : theme.colors.neutralL5};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  ${({ theme }) => theme.fonts.labelMD};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme, color, variant }) =>
      (variant === "filled" && color) || theme.colors.primary};
  }
`;

export const ResultContainer = styled.div`
  min-width: 200px;
  max-width: 250px;
  height: 70px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 7px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL2};
  border-radius: 5px;
  align-self: center;
  ${({ theme }) => theme.fonts.titleLG};
`;

export const ReportContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin: 10px 0;
  }
`;
