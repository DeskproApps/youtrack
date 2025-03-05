import { ErrorBlock } from "@/components";
import { FC, useState } from "react";
import { getCurrentUserService } from "@/services/youtrack";
import { getEntityIssueListService } from "@/services/entityAssociation";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, TicketData } from "@/types";
import { Stack } from "@deskpro/deskpro-ui";
import { useNavigate } from "react-router-dom";

const LoadingPage: FC = () => {
    const { client } = useDeskproAppClient()
    const { context } = useDeskproLatestAppContext<TicketData, Settings>()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)

    const navigate = useNavigate();

    // Determine authentication method from settings
    const isUsingOAuth = context?.settings.use_permanent_token !== true
    const ticketId = context?.data?.ticket?.id

    useDeskproElements(({ registerElement, clearElements }) => {
        clearElements()
        registerElement("refresh", { type: "refresh_button" })
    });

    useInitialisedDeskproAppClient((client) => {
        client.setTitle("YouTrack")

        if (!context || !context?.settings || !ticketId) {
            return
        }

        // Store the authentication method in the user state
        client.setUserState("isUsingOAuth", isUsingOAuth)

        // Verify authentication status
        // If OAuth2 mode and the user is logged in the request would be make with their stored access token
        // If permanent token mode the request would be made with the permanent token provided in the app setup
        getCurrentUserService(client)
            .then((user) => {
                if (user) {
                    setIsAuthenticated(true)
                }
            })
            .catch(() => { })
            .finally(() => {
                setIsFetchingAuth(false)
            })
    }, [context, context?.settings])

    if (!client || !ticketId || isFetchingAuth) {
        return (<LoadingSpinner />)
    }
    if (isAuthenticated) {
        getEntityIssueListService(client, ticketId)
            .then((entities) => {
                if (entities.length > 0) {
                    navigate("/home");
                } else {
                    navigate("/link")
                }
            })
            .catch(() => navigate("/link"))
    } else {

        if (isUsingOAuth) {
            navigate("/login")
        } else {
            // Show error for invalid access tokens (expired or not present)
            return (
                <Stack padding={12}>
                    <ErrorBlock text={"Invalid Access Token"} />
                </Stack>
            )
        }
    }

    return (
        <LoadingSpinner />
    );
};

export {LoadingPage};
