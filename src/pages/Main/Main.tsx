import {
  LoadingSpinner,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useCheckLinkedIssues } from "./hooks";

const Main = () => {
  useInitialisedDeskproAppClient((client) => {
    client.registerElement("refresh", { type: "refresh_button" });
  });

  useCheckLinkedIssues();

  return (
    <LoadingSpinner/>
  );
};

export { Main };
