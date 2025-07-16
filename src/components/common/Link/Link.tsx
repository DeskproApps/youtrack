import styled from "styled-components";
import { IconV2 } from "@deskpro/deskpro-ui";
import type { AnchorHTMLAttributes, ElementType } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { DeskproAppTheme } from "@deskpro/app-sdk";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: IconDefinition
} & DeskproAppTheme;

const Link: ElementType = styled(({ children, icon, ...rest }: LinkProps) => (
  <a {...rest}>
    {children}
    {icon && (
      <IconV2
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
