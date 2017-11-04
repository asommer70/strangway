#!/bin/bash
#
# Create databases using straight up SQL statements.
#

# Read the .env config file.
. .env

# createdb strangway_dev
psql -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DEV_DB_USER;" $DEV_DB_NAME
psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DEV_DB_USER;" $DEV_DB_NAME

# createdb strangway_test
psql -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $TEST_DB_USER;" $TEST_DB_NAME
psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $TEST_DB_USER;" $TEST_DB_NAME

# createdb strangway
psql -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;" $DB_NAME
psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;" $DB_NAME
