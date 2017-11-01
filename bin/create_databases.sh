#!/bin/bash
#
# Create databases using straight up SQL statements.
#

createdb strangway_dev
createdb strangway_test
createdb strangway

# GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO strangwaydev;
# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO strangwaydev;
