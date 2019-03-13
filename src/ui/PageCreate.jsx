import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionBar, Action, Button, Panel, Phrase } from '@deskpro/apps-components';

import { Form, Select, Input, Textarea } from '../Forms';
import { createIssue } from '../api';
import { getProp } from '../utils';
import { getProjects } from '../redux/selectors';
import { addIssue } from '../redux/actions';

const customFieldID = 'youtrackCards';

class PageCreate extends React.Component
{
  static propTypes = {

    /**
     * The youtrack domain
     */
    domain: PropTypes.string.isRequired,

    /**
     * Error callback
     */
    handleError: PropTypes.func,

    /**
     * Instance of dpapp.
     */
    dpapp: PropTypes.object,
  };

  static defaultProps = {
    handleError() {},
  };

  handleCreate = values => {

    const { project, ...others } = values;
    const issue = { project: project && project.value ? project.value: null, ...others };

    issue.search = '';

    return this.createIssueCallback({ activeTab: 'issues', fetchData: true, issue });
  };

  createIssueRequest = data => {
    const { dpapp } = this.props;
    const { customFields } = this.props.dpapp.context.get('ticket');

    const issue = getProp(data, 'issue', '');

    return createIssue(issue)
      .then((resp) => {
        const issueId = resp.headers.location.split('/').pop();
        this.props.dispatch(addIssue({
          id: issueId,
          field: [
            { name: 'summary', value: issue.summary},
            { name: 'description', value: issue.desc}
          ]
        }));
        return customFields.getAppField(customFieldID, [])
          .then((issues) => {
            return customFields.setAppField(customFieldID, [...issues, issueId])
              .then(() => {
                dpapp.ui.badgeCount = dpapp.ui.badgeCount + 1;
                this.backHome();
              })
              .catch(console.log);
          });
      });
  };

  createIssueCallback = data => {
    const { handleError } = this.props;
    this.createIssueRequest(data).catch(handleError);
  };

  backHome = () => {
    const { history }  = this.props;
    history.push("home", null);
    history.go(1);
  };

  render() {
    const { projects, dpapp } = this.props;

    return (
      <Form name="create_issue" onSubmit={this.handleCreate}>
        <Panel border={"none"}>
          <ActionBar title={dpapp.t('create_page.create_a_new_issue')}>
            <Action icon="close" onClick={this.backHome} />
          </ActionBar>
          <Select
            label={`${dpapp.t('youtrack.project')}:`}
            name="project"
            placeholder={dpapp.t('youtrack.please_select')}
            options={(() => projects.map(project => ({ label: project.name, value: project.shortName })))()}
          />

          <Input
            label={`${dpapp.t('youtrack.summary')}:`}
            name="summary"
          />

          <Textarea
            label={`${dpapp.t('youtrack.description')}:`}
            name="desc"
          />

          <div className="dp-form-group">
            <Button className={"dp-Button--wide"}><Phrase id="create_page.create_issue" /></Button>
          </div>

        </Panel>

      </Form>
    );
  }
}

export default connect(state => ({
  projects: getProjects(state)
}))(PageCreate);
