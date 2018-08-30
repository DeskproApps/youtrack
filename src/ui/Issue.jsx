
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Action, ActionBar, Level } from '@deskpro/apps-components';

const extractSummary = fields => fields.filter(field => field.name === 'summary');
const extractDescription = fields => fields.filter(field => field.name === 'summary');

const Issue = ({ issue, unlinkCallback, linkCallback, domain }) => (
  <ListItem className="dp-youtrack-issue">
    <ActionBar title={`${issue.id}`}>
      { unlinkCallback && <Action labelDisplay={"onHover"} label={"Unlink issue"} icon={"unlink"} onClick={() => unlinkCallback({ issue: issue.id, fetchData: true })} /> }
      { linkCallback && <Action labelDisplay={"onHover"} label={"Link issue"} icon={"link"} onClick={() => linkCallback({ issue: issue.id, fetchData: true })} /> }
      <Action labelDisplay={"onHover"} label={"Go to issue"} icon={"open"} onClick={() => window.open(`${domain}/youtrack/issue/${issue.id}`, "_blank")} />

    </ActionBar>
     <Level>
      {extractSummary(issue.field)[0].value}
    </Level>

  </ListItem>
);

Issue.propTypes = {
  domain: PropTypes.string.isRequired,
  issue: PropTypes.object.isRequired,
  unlinkCallback: PropTypes.func,
  linkCallback: PropTypes.func
};


export default Issue;
