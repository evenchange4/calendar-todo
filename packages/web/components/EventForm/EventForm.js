// @flow

import * as React from 'react';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { pure, compose } from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import SlideUp from './SlideUp';
import dateTimeFormater from './dateTimeFormater';
import { type FormikAPIProps, type Event } from '../../utils/type.flow';
import withInsertEvent, {
  type InjectedProps as WithInsertEventProps,
} from '../../modules/withInsertEvent';
import withUpdateEvent, {
  type InjectedProps as WithUpdateEventProps,
} from '../../modules/withUpdateEvent';
import log from '../../utils/log';

export type Fields<T> = {
  summary: T,
  description: T,
  location: T,
  start: T,
  end: T,
};

export type FormikFieldsProps = {
  values: Fields<string>,
  errors: Fields<string>,
  touched: Fields<boolean>,
};

type Props = {
  open: boolean,
  onHide: () => void,
  eventId?: string,
  defaultValues?: Event,
};

type InnerProps = FormikFieldsProps &
  FormikAPIProps &
  WithInsertEventProps &
  WithUpdateEventProps &
  Props;

class PureEventForm extends React.Component<InnerProps> {
  onSubmit = async (e: SyntheticEvent<any>) => {
    const {
      isValid,
      isSubmitting,
      values,
      insertEvent,
      updateEvent,
      onHide,
      defaultValues,
      eventId,
    } = this.props;
    if (e && e.preventDefault) e.preventDefault();
    if (!isValid || isSubmitting) return;
    const isEdit = Boolean(defaultValues);
    try {
      if (isEdit && eventId) {
        await updateEvent({ eventId, ...values });
      } else {
        await insertEvent(values);
      }
      onHide();
    } catch (error) {
      log(error);
    }
  };

  props: InnerProps;

  render() {
    const {
      open,
      onHide,
      defaultValues,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      isValid,
      isSubmitting,
    } = this.props;
    const { onSubmit } = this;
    const isEdit = Boolean(defaultValues);

    return (
      <Dialog
        open={open}
        TransitionComponent={SlideUp}
        keepMounted
        onClose={onHide}
        aria-labelledby="event-form-slide-title"
        aria-describedby="event-form-slide-description"
        fullWidth
      >
        <DialogTitle id="event-form-slide-title">
          {isEdit ? 'Update event' : 'Create new event'}
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            {/* 1. Summary */}
            <FormControl
              error={touched.summary && Boolean(errors.summary)}
              aria-describedby="summary"
              fullWidth
              required
              margin="normal"
            >
              <InputLabel htmlFor="summary" required>
                Summary
              </InputLabel>
              <Input
                id="summary"
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormHelperText>
                {touched.summary && Boolean(errors.summary)
                  ? errors.summary
                  : 'ex: Workshop 1: AWS 101 - Introduction to AWS Cloud Computing'}
              </FormHelperText>
            </FormControl>

            {/* 2. Description */}
            <FormControl
              error={touched.description && Boolean(errors.description)}
              aria-describedby="description"
              fullWidth
            >
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.description &&
                Boolean(errors.description) && (
                  <FormHelperText>{errors.description}</FormHelperText>
                )}
            </FormControl>

            {/* 3. Location */}
            <FormControl
              error={touched.location && Boolean(errors.location)}
              aria-describedby="location"
              fullWidth
              required
              margin="normal"
            >
              <InputLabel htmlFor="location" required>
                Location
              </InputLabel>
              <Input
                id="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormHelperText>
                {touched.location && Boolean(errors.location)
                  ? errors.location
                  : 'ex: Taipei'}
              </FormHelperText>
            </FormControl>

            {/* 4. Start */}
            <FormControl
              error={touched.start && Boolean(errors.start)}
              aria-describedby="start"
              required
              margin="normal"
            >
              <InputLabel htmlFor="start" required>
                Start
              </InputLabel>
              <Input
                id="start"
                value={dateTimeFormater(values.start)}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="datetime-local"
              />
              {touched.start &&
                Boolean(errors.start) && (
                  <FormHelperText>{errors.start}</FormHelperText>
                )}
            </FormControl>

            {/* 5. End */}
            <FormControl
              error={touched.end && Boolean(errors.end)}
              aria-describedby="end"
              required
              margin="normal"
            >
              <InputLabel htmlFor="end" required>
                End
              </InputLabel>
              <Input
                id="end"
                value={dateTimeFormater(values.end)}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="datetime-local"
              />
              {touched.end &&
                Boolean(errors.end) && (
                  <FormHelperText>{errors.end}</FormHelperText>
                )}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide} color="primary">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            color="primary"
            variant="contained"
            disabled={!isValid || isSubmitting}
          >
            {isEdit ? 'Save' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const enhance = compose(
  pure,
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ defaultValues = {} }) => ({
      summary: defaultValues.summary || '',
      description: defaultValues.description || '',
      location: defaultValues.location || '',
      start: defaultValues.start ? defaultValues.start.dateTime : new Date(),
      end: defaultValues.end ? defaultValues.end.dateTime : new Date(),
    }),
    validate: (values: Fields<string>): Object => ({
      ...(R.trim(values.summary)
        ? {}
        : { summary: 'Please input the summary' }),
      ...(R.trim(values.location)
        ? {}
        : { location: 'Please input the location' }),
      ...(values.start ? {} : { start: 'Please input the start' }),
      ...(values.end ? {} : { end: 'Please input the end' }),
    }),
  }),
  withInsertEvent,
  withUpdateEvent,
);

const EventForm: React.ComponentType<Props> = enhance(PureEventForm);
EventForm.displayName = 'EventForm';

export default EventForm;
