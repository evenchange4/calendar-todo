/* global window */
// @flow
import * as React from 'react';
import { pure, compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withEvent, {
  type InjectedProps as WithEventProps,
} from '../../modules/withEvent';
import withDeleteEvent, {
  type InjectedProps as WithDeleteEventProps,
} from '../../modules/withDeleteEvent';
import log from '../../utils/log';
import EventForm from '../EventForm/EventForm';
import dateTimeFormater from './dateTimeFormater';

type Props = {
  eventId: string,
};

type State = {
  isEventFormOpen: boolean,
};

type InnerProps = WithEventProps & WithDeleteEventProps & Props;

class PureEventDetail extends React.Component<InnerProps, State> {
  state = {
    isEventFormOpen: false,
  };

  onUpdateClick = () => this.setState({ isEventFormOpen: true });

  onEventFormHide = () => this.setState({ isEventFormOpen: false });

  onDelete = async (e: SyntheticEvent<any>) => {
    const { eventId, deleteEvent } = this.props;

    if (e && e.preventDefault) e.preventDefault();
    if (!window.confirm('Do you really want to delete?')) return;

    try {
      await deleteEvent(eventId);
    } catch (error) {
      log(error);
    }
  };

  props: InnerProps;

  render() {
    const {
      event: { event, loading, error },
    } = this.props;
    const { isEventFormOpen } = this.state;
    const { onUpdateClick, onDelete, onEventFormHide } = this;

    if (loading) {
      return (
        <div style={{ width: '100%' }}>
          <Typography variant="button" align="center" gutterBottom>
            <CircularProgress size={24} />
          </Typography>
        </div>
      );
    }
    if (error) return error;

    return (
      <div style={{ width: '100%' }}>
        <Typography variant="caption" gutterBottom align="center">
          From {dateTimeFormater(event.start.dateTime)} to{' '}
          {dateTimeFormater(event.end.dateTime)}
        </Typography>
        <Typography>Description: {event.description}</Typography>
        <Typography variant="button" align="center" gutterBottom>
          <Button
            color="primary"
            component="a"
            href={event.htmlLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            Share
          </Button>
          <Button color="primary" onClick={onUpdateClick}>
            Edit
          </Button>
          <Button color="secondary" onClick={onDelete}>
            Delete
          </Button>
        </Typography>

        {/* Edit */}
        <EventForm
          open={isEventFormOpen}
          eventId={event.id}
          onHide={onEventFormHide}
          defaultValues={event}
        />
      </div>
    );
  }
}

const enhance = compose(
  pure,
  withEvent,
  withDeleteEvent,
);

const EventDetail: React.ComponentType<Props> = enhance(PureEventDetail);
EventDetail.displayName = 'EventDetail';

export default EventDetail;
