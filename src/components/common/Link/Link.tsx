import React from "react";
import styled from "styled-components";
import { Icon } from "@deskpro/app-sdk";
import type { AnchorHTMLAttributes, ElementType } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: IconDefinition
};

const Link: ElementType = styled(({ children, icon, ...rest }) => (
  <a {...rest}>
    {children}
    {icon && (
      <Icon
        size={8}
        icon={icon}
        themeColor="grey40"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - wrong type in Icon - we can pass styles
        style={{ paddingLeft: "5px" }}
      />
    )}
  </a>
))<LinkProps>`
  color: ${({ theme }) => theme.colors.cyan100};
`;

export { Link };
