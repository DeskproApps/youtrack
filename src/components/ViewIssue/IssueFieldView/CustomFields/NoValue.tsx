import React from "react";
import { P5 } from "@deskpro/app-sdk";
import type { FC } from "react";

type Props = { text?: string };

const NoValue: FC<Props> = ({ text = "-" }) => (
  <P5>{text}</P5>
);

export { NoValue };
