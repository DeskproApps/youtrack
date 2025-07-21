import { Button } from "@/components/common";
import { getCurrentUserService } from "@/services/youtrack";
import { nbsp } from "@/constants";
import { P1, Stack } from "@deskpro/deskpro-ui";
import { TSpan } from "@deskpro/deskpro-ui";
import { DeskproAppTheme, useDeskproAppClient, useDeskproAppEvents } from "@deskpro/app-sdk";
import { useState, useCallback } from "react";
import styled from "styled-components";
import type { FC } from "react";
import type { Me } from "@/services/youtrack/types";
import type { Settings } from "@/types";

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const Valid = styled.span<DeskproAppTheme>`
  color: ${({ theme }) => theme.colors.grey100};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();

  const [currentUser, setCurrentUser] = useState<Me | null>(null);
  const [settings, setSettings] = useState<Settings & { permanent_auth_token?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const errorMessage = "Failed to connect to YouTrack, settings seem to be invalid"

  const onVerifySettings = useCallback(() => {
    if (!client || !settings?.instance_url || !settings?.permanent_auth_token) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentUser(null);

    return getCurrentUserService(client, {
      instance_url: settings.instance_url,
      permanent_auth_token: settings.permanent_auth_token,
    })
      .then(setCurrentUser)
      .catch(() => setError(errorMessage))
      .finally(() => setIsLoading(false));
  }, [client, settings, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        // The button is disabled if the required settings are missing or it is currently loading.
        disabled={!(settings?.instance_url && settings?.permanent_auth_token) || isLoading}
      />
      {nbsp}
      {currentUser
        ? (
          <P1>
            Verified as <Valid>{currentUser.fullName} {`<${currentUser.email}>`}</Valid>
          </P1>
        )
        : <Invalid type="p1">{error}</Invalid>
      }
    </Stack>
  );
};

export { VerifySettings };
