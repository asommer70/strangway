# Basic go commands
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get

# Binary names
BINARY_NAME=strangway
BINARY_UNIX=$(BINARY_NAME)_unix

# Environment variables change them for your system.
export PORT = 3000
export TESTCONSTR = host=localhost user=strang dbname=strangway_test sslmode=disable password=things
export DEVCONSTR = host=localhost user=strang dbname=strangway_dev sslmode=disable password=things
export PROCONSTR = host=localhost user=strang dbname=strangway sslmode=disable password=things

all: test build
build:
		$(GOBUILD) -o $(BINARY_NAME) -v
test:
		$(GOTEST) ./...
clean:
		$(GOCLEAN)
		rm -f $(BINARY_NAME)
		rm -f $(BINARY_UNIX)
run:
		$(GOBUILD) -o $(BINARY_NAME)
		./$(BINARY_NAME)
deps:
		$(GOGET) github.com/jinzhu/gorm/dialects/postgres
		$(GOGET) github.com/jinzhu/gorm
		$(GOGET) github.com/lib/pq

# Cross compilation
build-linux:
		CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -o $(BINARY_UNIX) -v