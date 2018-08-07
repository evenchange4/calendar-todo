#!/bin/bash

set -eu

TEMP=$(yarn run flow-coverage)

echo "$TEMP"

if [[ $TEMP = *"(0 errors)"* ]]; then
  echo -e '\n\n> Flow pass\n\n';
  exit 0;
else
  echo -e '\n\n> Flow with errors\n\n';
  exit 1;
fi
