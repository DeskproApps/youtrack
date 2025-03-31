import { AnchorButton, H3, Stack } from "@deskpro/deskpro-ui"
import { ErrorBlock } from "@/components"
import { FC } from "react"
import { useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk"
import useLogin from "./useLogin"

const LoginPage: FC = () => {
    useDeskproElements(({ registerElement, clearElements, deRegisterElement }) => {
        clearElements()
        deRegisterElement("menu")
        deRegisterElement("home")
        deRegisterElement("edit")
        deRegisterElement("plus")
        registerElement("refresh", { type: "refresh_button" })
    })

    useInitialisedDeskproAppClient((client) => {
        client.setTitle("Login")
    }, [])

    const { onSignIn, authUrl, isLoading, error } = useLogin();

    return (
        <Stack padding={12} vertical gap={12} role="alert">
            <H3>Log into your YouTrack account.</H3>
            <AnchorButton
                disabled={!authUrl || isLoading}
                href={authUrl || "#"}
                loading={isLoading}
                onClick={onSignIn}
                target={"_blank"}
                text={"Log In"}
            />

            {error && <ErrorBlock text={error} />}
        </Stack>
    )
}

export { LoginPage }