import { useCallback, useContext, createContext } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { match } from "ts-pattern";
import { useDebouncedCallback } from "use-debounce";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useLinkedIssues } from "./useLinkedIssues";
import { getEntityIssueListService } from "../services/entityAssociation";
import { createIssueCommentService, searchIssuesByIdsService } from "../services/youtrack";
import type { FC, PropsWithChildren } from "react";
import type { IDeskproClient, GetStateResponse, TargetAction } from "@deskpro/app-sdk";
import type { Issue } from "../services/youtrack/types";
import type { TicketContext, TicketData } from "../types";

const appPrefix = "youtrack";

export type ReplyBoxType = "note" | "email";

export type SetSelectionState = (issueId: Issue["idReadable"], selected: boolean, type: ReplyBoxType) => void|Promise<{ isSuccess: boolean }|void>;

export type GetSelectionState = (issueId: Issue["idReadable"], type: ReplyBoxType) => void|Promise<Array<GetStateResponse<string>>>;

export type DeleteSelectionState = (issueId: Issue["idReadable"], type: ReplyBoxType) => void|Promise<boolean|void>;

type ReturnUseReplyBox = {
  setSelectionState: SetSelectionState,
  getSelectionState: GetSelectionState,
  deleteSelectionState: DeleteSelectionState,
};

const noteKey = (ticketId: string, issueId: Issue["idReadable"]) => {
  return `tickets/${ticketId}/${appPrefix}/notes/selection/${issueId}`.toLowerCase();
};

const emailKey = (ticketId: string, issueId: Issue["idReadable"]) => {
  return `tickets/${ticketId}/${appPrefix}/emails/selection/${issueId}`.toLowerCase();
};

const registerReplyBoxNotesAdditionsTargetAction = (
  client: IDeskproClient,
  ticketId: TicketData["ticket"]["id"],
  issues: Issue[],
): void|Promise<void> => {
  if (!ticketId) {
    return;
  }

  if (Array.isArray(issues) && issues.length === 0) {
    return client.deregisterTargetAction(`${appPrefix}ReplyBoxNoteAdditions`);
  }

  return Promise
    .all(issues.map((issue: Issue) => client.getState<{ selected: boolean }>(noteKey(ticketId, issue.idReadable))))
    .then((flags) => {
      client.registerTargetAction(`${appPrefix}ReplyBoxNoteAdditions`, "reply_box_note_item_selection", {
        title: "Add to YouTrack",
        payload: issues.map((issue, idx) => ({
          id: issue.idReadable,
          title: issue.idReadable,
          selected: flags[idx][0]?.data?.selected ?? false,
        })),
      });
    })
  ;
};

const registerReplyBoxEmailsAdditionsTargetAction = (
  client: IDeskproClient,
  ticketId: TicketData["ticket"]["id"],
  issues: Issue[],
): void|Promise<void> => {
  if (!ticketId) {
    return;
  }

  if (Array.isArray(issues) && issues.length === 0) {
    return client.deregisterTargetAction(`${appPrefix}ReplyBoxEmailAdditions`);
  }

  return Promise
    .all(issues.map((issue: Issue) => {
      return client.getState<{ selected: boolean }>(emailKey(ticketId, issue.idReadable))
    }))
    .then((flags) => {
      return client.registerTargetAction(`${appPrefix}ReplyBoxEmailAdditions`, "reply_box_email_item_selection", {
        title: `Add to YouTrack`,
        payload: issues.map((issue, idx) => ({
          id: issue.idReadable,
          title: issue.idReadable,
          selected: flags[idx][0]?.data?.selected ?? false,
        })),
      });
    });
};

const ReplyBoxContext = createContext<ReturnUseReplyBox>({
  setSelectionState: () => {},
  getSelectionState: () => {},
  deleteSelectionState: () => {},
});

const useReplyBox = () => useContext<ReturnUseReplyBox>(ReplyBoxContext);

const ReplyBoxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { client } = useDeskproAppClient();
  const { issues } = useLinkedIssues();

  const ticketId = get(context, ["data", "ticket", "id"]);
  const isCommentOnNote = get(context, ["settings", "default_comment_on_ticket_note"]);
  const isCommentOnEmail = get(context, ["settings", "default_comment_on_ticket_reply"]);

  const setSelectionState: SetSelectionState = useCallback((issueId, selected, type) => {
    if (!ticketId || !client) {
      return
    }

    if (type === "note" && isCommentOnNote) {
      return client.setState(noteKey(ticketId, issueId), { id: issueId, selected })
        .then(() => getEntityIssueListService(client, ticketId))
        .then((entities) =>  isEmpty(entities) ? Promise.resolve([]) : searchIssuesByIdsService(client, entities))
        .then((issues) => registerReplyBoxNotesAdditionsTargetAction(client, ticketId, issues))
        .catch(() => {})
    }

    if (type === "email" && isCommentOnEmail) {
      return client?.setState(emailKey(ticketId, issueId), { id: issueId, selected })
        .then(() => getEntityIssueListService(client, ticketId))
        .then((entities) => isEmpty(entities) ? Promise.resolve([]) : searchIssuesByIdsService(client, entities))
        .then((issues) => registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, issues))
        .catch(() => {})
    }
  }, [client, ticketId, isCommentOnNote, isCommentOnEmail]);

  const getSelectionState: GetSelectionState = useCallback((issueId, type) => {
    if (!ticketId) {
      return
    }

    const key = (type === "email") ? emailKey : noteKey;
    return client?.getState<string>(key(ticketId, issueId))
  }, [client, ticketId]);

  const deleteSelectionState: DeleteSelectionState = useCallback((issueId, type) => {
    if (!ticketId || !client) {
      return;
    }

    const key = (type === "email") ? emailKey : noteKey;

    return client.deleteState(key(ticketId, issueId))
      .then(() => getEntityIssueListService(client, ticketId))
      .then((entities) => isEmpty(entities) ? Promise.resolve([]) : searchIssuesByIdsService(client, entities))
      .then((issues) => {
        const register = (type === "email") ? registerReplyBoxEmailsAdditionsTargetAction : registerReplyBoxNotesAdditionsTargetAction;
        return register(client, ticketId, issues);
      })
  }, [client, ticketId]);

  useInitialisedDeskproAppClient((client) => {
    if (isCommentOnNote) {
      registerReplyBoxNotesAdditionsTargetAction(client, ticketId, issues);
      client.registerTargetAction(`${appPrefix}OnReplyBoxNote`, "on_reply_box_note");
    }

    if (isCommentOnEmail) {
      registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, issues);
      client.registerTargetAction(`${appPrefix}OnReplyBoxEmail`, "on_reply_box_email");
    }
  }, [issues, ticketId, isCommentOnNote, isCommentOnEmail]);

  const debounceTargetAction = useDebouncedCallback<(a: TargetAction) => void>((action: TargetAction) => match<string>(action.name)
    .with(`${appPrefix}OnReplyBoxEmail`, () => {
        const subjectTicketId = action.subject;
        const email = action.payload.email;

        if (!ticketId || !email || !client) {
          return;
        }

        if (subjectTicketId !== ticketId) {
          return;
        }

        client.setBlocking(true);
        client.getState<{ id: string; selected: boolean }>(`tickets/${ticketId}/${appPrefix}/emails/selection/*`)
          .then((selections) => {
            const issueIds = selections
              .filter(({ data }) => data?.selected)
              .map(({ data }) => data?.id as Issue["idReadable"]);

            return Promise.all(issueIds.map((issueId) => createIssueCommentService(client, issueId, { text: email })))
          })
          .finally(() => client.setBlocking(false));
  })
    .with(`${appPrefix}OnReplyBoxNote`, () => {
      const subjectTicketId = action.subject;
      const note = action.payload.note;

      if (!ticketId || !note || !client) {
        return;
      }

      if (subjectTicketId !== ticketId) {
        return;
      }

      client.setBlocking(true);
      client.getState<{ id: string; selected: boolean }>(`tickets/${ticketId}/${appPrefix}/notes/selection/*`)
        .then((selections) => {
          const issueIds = selections
            .filter(({ data }) => data?.selected)
            .map(({ data }) => data?.id as Issue["idReadable"]);

          return Promise.all(issueIds.map((issueId) => createIssueCommentService(client, issueId, { text: note })));
        })
        .finally(() => client.setBlocking(false));
    })
    .with(`${appPrefix}ReplyBoxEmailAdditions`, () => {
      (action.payload ?? []).forEach((selection: { id: string; selected: boolean; }) => {
        const subjectTicketId = action.subject;

        if (ticketId) {
          client?.setState(emailKey(subjectTicketId, selection.id), { id: selection.id, selected: selection.selected })
            .then((result) => {

              if (result.isSuccess) {
                registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, issues);
              }
            });
        }
      })
    })
    .with(`${appPrefix}ReplyBoxNoteAdditions`, () => {
      (action.payload ?? []).forEach((selection: { id: string; selected: boolean; }) => {
        const subjectTicketId = action.subject;

        if (ticketId) {
          client?.setState(noteKey(subjectTicketId, selection.id), { id: selection.id, selected: selection.selected })
            .then((result) => {
              if (result.isSuccess) {
                registerReplyBoxNotesAdditionsTargetAction(client, subjectTicketId, issues);
              }
            });
        }
      })
    })
    .run(),
    200
  );

  useDeskproAppEvents({
    onTargetAction: debounceTargetAction,
  }, [context?.data]);

  return (
    <ReplyBoxContext.Provider value={{
      setSelectionState,
      getSelectionState,
      deleteSelectionState,
    }}>
      {children}
    </ReplyBoxContext.Provider>
  );
};

export { useReplyBox, ReplyBoxProvider };
