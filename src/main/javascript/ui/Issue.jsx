
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListElement, Heading } from '@deskpro/react-components';

const extractSummary = fields => fields.filter(field => field.name === 'summary');

const Issue = ({ issue, unlinkCallback }) => (
  <ListElement className="dp-youtrack-issue">
    <Icon
      name="times"
      title="Unlink issue"
      className="dp-youtrack-delete-icon"
      onClick={() => unlinkCallback({ issue: issue.id, fetchData: true })}
    />
    <a href={`https://deskpro.myjetbrains.com/youtrack/issue/${issue.id}`} target="_blank" rel="noopener noreferrer">
      <Heading size={4}>
        #{issue.id} - { extractSummary(issue.field)[0].value }
        <Icon name="external-link-square" />
      </Heading>
    </a>
  </ListElement>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  unlinkCallback: PropTypes.func
};

Issue.defaultProps = {
  unlinkCallback: () => {}
};

export default Issue;
