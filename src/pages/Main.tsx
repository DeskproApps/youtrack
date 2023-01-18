import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

export const Main = () => {
  useInitialisedDeskproAppClient((client) => {
    client.registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <>Main</>
  );
};
