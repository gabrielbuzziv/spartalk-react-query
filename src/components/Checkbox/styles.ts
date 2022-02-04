import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})<{ isChecked: boolean }>`
  border: 1px solid #999;
  border-radius: 3px;

  align-items: center;
  justify-content: center;

  height: 20px;
  width: 20px;

  ${({ isChecked }) => isChecked && css`
    background: #026FF9;
    border-color: #026FF9;
  `}
`;