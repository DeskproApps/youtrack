import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

const Main = () => {
  useInitialisedDeskproAppClient((client) => {
    client.registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <>Main</>
  );
};

export { Main };
