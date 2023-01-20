import React, { useMemo, useState, useCallback } from "react";
import every from "lodash/every";
import styled from "styled-components";
import {
  P1,
  Stack,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { Button } from "../../components/common";
import { nbsp } from "../../constants";
import { getCurrentUserService } from "../../services/youtrack";
import type { FC } from "react";
import type { Settings } from "../../types";
import type { User } from "../../services/youtrack/types";

const Invalid = styled(P1)`
  color: ${({ theme }) => theme.colors.red100};
`;

const Valid = styled.span`
  color: ${({ theme }) => theme.colors.grey100};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();

  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const errorMessage = useMemo(() => "Failed to connect to YouTrack, settings seem to be invalid", []);

  const onVerifySettings = useCallback(() => {
    if (!client || !settings?.domain || !settings?.permanent_auth_token) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentUser(null);

    return getCurrentUserService(client, {
      domain: settings.domain,
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
        disabled={!every([settings?.domain, settings?.permanent_auth_token] || isLoading)}
      />
      {nbsp}
      {currentUser
        ? (
          <P1>
            Verified as <Valid>{currentUser.name} {`<${currentUser.email}>`}</Valid>
          </P1>
        )
        : <Invalid>{error}</Invalid> || ""
      }
    </Stack>
  );
};

export { VerifySettings };
