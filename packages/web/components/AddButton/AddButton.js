// @flow
import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EventForm from '../EventForm/EventForm';
import { Fixed } from './styled-components';

type State = { isOpen: boolean };

class AddButton extends React.PureComponent<{||}, State> {
  state = {
    isOpen: false,
  };

  onClick = () => this.setState({ isOpen: true });

  onHide = () => this.setState({ isOpen: false });

  render() {
    const { onClick, onHide } = this;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Fixed>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={onClick}
          >
            <AddIcon />
          </Button>
        </Fixed>

        <EventForm open={isOpen} onHide={onHide} />
      </React.Fragment>
    );
  }
}

export default AddButton;
