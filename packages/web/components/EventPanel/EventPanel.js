// @flow
import * as React from 'react';
import { pure, compose } from 'recompose';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventDetail from '../EventDetail/EventDetail';
import { Location } from './styled-components';
import withEvents, {
  type InjectedProps as WithEventsProps,
} from '../../modules/withEvents';

type State = {
  expandedId: ?string,
};

type Props = WithEventsProps;

class PureEventPanel extends React.Component<Props, State> {
  state = { expandedId: null };

  onExpandedChanged = (id: string) => () => this.setState({ expandedId: id });

  props: Props;

  render() {
    const { events } = this.props;
    const { expandedId } = this.state;
    const { onExpandedChanged } = this;

    return (events.events || []).map(({ id, summary, location }) => (
      <ExpansionPanel
        key={id}
        expanded={id === expandedId}
        onChange={onExpandedChanged(id)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{summary}</Typography>
          <Location>
            <Typography>@{location}</Typography>
          </Location>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {id === expandedId && <EventDetail eventId={id} />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }
}

const enhance = compose(
  pure,
  withEvents,
);

const EventPanel: React.ComponentType<{||}> = enhance(PureEventPanel);
EventPanel.displayName = 'EventPanel';

export default EventPanel;
