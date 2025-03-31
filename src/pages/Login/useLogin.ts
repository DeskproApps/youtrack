import { Settings, TicketData } from "@/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { IOAuth2, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useCallback, useState } from "react";
import { getCurrentUserService, getAccessToken } from "@/services/youtrack";
import { getEntityIssueListService } from "@/services/entityAssociation";
import { placeholders } from "@/services/youtrack/constants";

interface UseLogin {
    onSignIn: () => void,
    authUrl: string | null,
    error: null | string,
    isLoading: boolean,
};

export default function useLogin(): UseLogin {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPolling, setIsPolling] = useState(false)
    const [oauth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)

    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<TicketData, Settings>()

    const ticketId = context?.data?.ticket?.id
    const isUsingOAuth = context?.settings.use_permanent_token === false

    useInitialisedDeskproAppClient(async (client) => {
        if (!context?.settings || !ticketId) {
            // Make sure settings have loaded.
            return
        }

        // Ensure they aren't using permanent tokens
        if (!isUsingOAuth) {
            setError("Enable OAuth to access this page");
            return
        }

        const clientId = context?.settings.client_id;
        if (typeof clientId !== 'string' || !clientId) {
            // Local mode requires a clientId.
            setError("A service ID is required");
            return
        }

        // Start OAuth process depending on the authentication mode
        const oauth2Response = await client.startOauth2Local(
            ({ state, callbackUrl }) => {
                return `${context?.settings.instance_url}/hub/api/rest/oauth2/auth?${createSearchParams([
                    ["response_type", "code"],
                    ["client_id", clientId ?? ""],
                    ["state", state],
                    ["redirect_uri", callbackUrl],
                    ["scope", "YouTrack"],
                ])}`
            },
            /\bcode=(?<code>[^&#]+)/,
            async (code: string): Promise<OAuth2Result> => {
                // Extract the callback URL from the authorization URL
                const url = new URL(oauth2Response.authorizationUrl);
                const redirectUri = url.searchParams.get("redirect_uri");

                if (!redirectUri) {
                    throw new Error("Failed to get callback URL");
                }

                const data = await getAccessToken(client, code, redirectUri);

                return { data }
            }
        )

        setAuthUrl(oauth2Response.authorizationUrl)
        setOAuth2Context(oauth2Response)


    }, [setAuthUrl, context?.settings])


    useInitialisedDeskproAppClient((client) => {
        if (!ticketId || !oauth2Context) {
            return
        }

        const startPolling = async () => {
            try {
                const result = await oauth2Context.poll()

                await client.setUserState(placeholders.OAUTH2_ACCESS_TOKEN_PATH, result.data.access_token, { backend: true })

                if (result.data.refresh_token) {
                    await client.setUserState(placeholders.OAUTH2_REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true })
                }

                getCurrentUserService(client)
                    .then((user) => {
                        if (!user) {
                            throw new Error("Error authenticating user")
                        }
                    })
                    .catch(() => { throw new Error("Error authenticating user") })

                getEntityIssueListService(client, ticketId)
                    .then((entities) => {
                        if (entities.length > 0) {
                            navigate("/home");
                        } else {
                            navigate("/link")
                        }
                    })
                    .catch(() => navigate("/link"))
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setIsLoading(false);
            } finally {
                setIsLoading(false)
                setIsPolling(false)
            }
        }

        if (isPolling) {
            void startPolling()
        }
    }, [isPolling, ticketId, oauth2Context, navigate])

    const onSignIn = useCallback(() => {
        setIsLoading(true);
        setIsPolling(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}