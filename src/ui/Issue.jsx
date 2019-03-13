
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Action, ActionBar, Level, Menu } from '@deskpro/apps-components';
import youtrackLogo from "../main/resources/icon.png";

const extractSummary = fields => fields.find(field => field.name === 'summary');

class Issue extends React.PureComponent
{
  static propTypes = {
    /**
     * Instance of dpapp.
     */
    dpapp: PropTypes.object,

    domain: PropTypes.string.isRequired,
    issue: PropTypes.object.isRequired,
    unlinkCallback: PropTypes.func,
    linkCallback: PropTypes.func
  };

  static defaultProps = {
    unlinkCallback: null,
    linkCallback: null,
  };

  constructor(props) {
    super(props);
    this.menu = React.createRef();
    this.state = {
      menuOpen: false,
      confirmUnlink: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu);
  }

  toggleMenu = () => {
    if (this.state.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  openMenu = () => {
    this.setState({
      menuOpen: true
    });
    document.addEventListener('mousedown', this.closeMenu);
  };

  closeMenu = (e) => {
    if (this.menu.current && e && this.menu.current.contains(e.target)) {
      return;
    }
    this.setState({
      menuOpen: false,
      confirmUnlink: false
    });
    document.removeEventListener('mousedown', this.closeMenu);
  };

  confirmUnlink = () => {
    this.setState({
      confirmUnlink: true,
    });
  };

  render() {
    const { issue, unlinkCallback, linkCallback, domain, dpapp } = this.props;
    const { confirmUnlink, menuOpen } = this.state;

    if (!issue || !issue.id) {
      return null;
    }

    return (
      <ListItem className="dp-youtrack-issue">
        <ActionBar
          title={<a href={`${domain}/youtrack/issue/${issue.id}`} target="_blank">#{issue.id}</a>}
          iconUrl={youtrackLogo}
        >
          <Menu
            key="menu"
            onClick={this.toggleMenu}
            isOpen={menuOpen}
            ref={this.menu}
          >
            <Action key="open" label={dpapp.t('open')} icon={"open"} onClick={() => window.open(`${domain}/youtrack/issue/${issue.id}`, "_blank")} />
            { unlinkCallback && !confirmUnlink && <Action key="unlink" label={dpapp.t('issue.unlink_issue')} icon="unlink" onClick={this.confirmUnlink} /> }
            { unlinkCallback && confirmUnlink && <Action key="unlink" label={dpapp.t('issue.are_you_sure')} onClick={() => unlinkCallback(issue)} /> }
            { linkCallback && <Action key="link" label={dpapp.t('issue.link_issue')} icon={"link"} onClick={() => linkCallback(issue)} /> }
          </Menu>

        </ActionBar>
        <Level>
          {extractSummary(issue.field).value}
        </Level>

      </ListItem>
    );
  }
}

export default Issue;
