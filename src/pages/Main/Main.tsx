import { LoadingSpinner } from "@deskpro/app-sdk";
import { useCheckLinkedIssues } from "./hooks";

const Main = () => {
  useCheckLinkedIssues();

  return (
    <LoadingSpinner/>
  );
};

export { Main };
