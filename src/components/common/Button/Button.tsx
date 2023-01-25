import { FC } from "react";
import styled from "styled-components";
import { ButtonProps, Button as ButtonUI } from "@deskpro/deskpro-ui";

export const Button: FC<ButtonProps> = styled(ButtonUI)`
  min-width: 72px;
  justify-content: center;
`;
