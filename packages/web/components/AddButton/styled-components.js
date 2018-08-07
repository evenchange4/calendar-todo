// @flow
import * as React from 'react';

export const Fixed = (props: any) => (
  <div
    style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
    }}
    {...props}
  />
);

export default Fixed;
