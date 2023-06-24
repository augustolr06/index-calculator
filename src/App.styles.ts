import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
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
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL2};
  // cada elemento filho vai ter no máximo 300px
  & > * {
    max-width: 300px;
  }
`;

export const ButtonSubmit = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutralL5};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  ${({ theme }) => theme.fonts.labelMD};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryL1};
  }
`;

export const ResultContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL2};
  border-radius: 5px;
  align-self: center;
  ${({ theme }) => theme.fonts.titleLG};
`;
