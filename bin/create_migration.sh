#!/bin/bash
#
# Create a simple empty migration file.
#


# Check for arguments and print a message if there are none.
if [[ $# -eq 0 ]] ; then
    echo 'Please provide a name for the migration file.'
    exit 0
fi

date=$(date)
echo "-- Migration created: $date" > ./migrations/$(date +%s)_$1.sql
