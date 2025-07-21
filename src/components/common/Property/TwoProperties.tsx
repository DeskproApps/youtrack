import * as React from "react";
import styled, { css } from "styled-components";
import { Stack } from "@deskpro/deskpro-ui";
import { Property } from "./Property";
import type { Props as PropertyProps } from "./types";
import { DeskproAppTheme } from "@deskpro/app-sdk";

export type Props = {
  leftLabel?: PropertyProps["label"],
  leftText?: PropertyProps["text"],
  rightLabel?: PropertyProps["label"],
  rightText?: PropertyProps["text"],
};

const Container = styled(Stack)`
  width: 100%;
  margin-bottom: -1px;
`;

const Side = styled.div<{ withDivider?: boolean } & DeskproAppTheme>`
  display: inline-block;
  margin-bottom: 10px;

  ${({withDivider, theme}) => withDivider
    ? css`
      width: calc(50% - 6px - 1px);
      padding-left: 10px;
      border-left: 1px solid ${theme.colors.grey20};
    `
    : css`
      width: calc(50% - 6px);
    `
  }
`;

const TwoProperties: React.FC<Props> = ({ leftLabel, leftText, rightLabel, rightText }) => (
  <Container>
    <Side>
      <Property
        marginBottom={0}
        label={leftLabel}
        text={leftText}
      />
    </Side>
    <Side withDivider>
      <Property
        marginBottom={0}
        label={rightLabel}
        text={rightText}
      />
    </Side>
  </Container>
);

export { TwoProperties };
