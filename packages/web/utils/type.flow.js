// @flow
import * as React from 'react';

// HOC
export type HOC<Base, InjectedProps> = (
  Component: React.ComponentType<Base>,
) => React.ComponentType<$Diff<Base, InjectedProps>>;

// Formik
export type SetSubmitting = boolean => void;
export type SetFieldError = (field: string, errorMsg: string) => void;
export type FormikAPIProps = {
  handleChange: (e: SyntheticEvent<any>) => void,
  handleBlur: (e: SyntheticEvent<any>) => void,
  isSubmitting: boolean,
  isValid: boolean,
  setSubmitting: (isSubmitting: boolean) => void,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  setFieldError: SetFieldError,
  resetForm: (nextValues?: any) => void,
};

// Apollo
export type GraphQLError = {
  message: string,
  locations: Array<{ line: number, column: number }>,
  path: Array<string>,
  code: number,
};
export type ReadQuery = ({ query: Object, variables?: Object }) => Object;
export type WriteQuery = ({
  query: Object,
  variables?: Object,
  data: Object,
}) => void;
export type Proxy = {
  readQuery: ReadQuery,
  writeQuery: WriteQuery,
};

// Server
export type Dotenv = {|
  API_DOMAIN: string,
|};

// Next
export type Router = {
  query: { slug?: string },
  pathname: string,
};
export type Context = {
  pathname: string,
  asPath: string,
  res: {
    writeHead: (number, any) => void,
    end: () => void,
    finished: boolean,
  },
  // Server only
  req: {
    headers: {
      cookie: string,
    },
    messages: Object,
    dotenv: Dotenv,
  },
  // Server only
  res: Object,
  // _document only
  renderPage: (
    enhancer: (React.ComponentType<*>) => React.ComponentType<*>,
  ) => {
    html: string,
    head: Array<Object>,
    errorHtml: string,
    chunks: {
      names: Array<string>,
      filenames: Array<string>,
    },
    buildManifest: any,
  },
};

// Event
export type Time = {
  dateTime: string,
  timeZone: string,
};
export type Event = {
  kind: string,
  etag: string,
  status: string,
  htmlLink: string,
  id: string,
  summary: string,
  description: string,
  location: string,
  start: Time,
  end: Time,
};
export type Events = Array<Event>;
