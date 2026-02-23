#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths for CloudLinux
NODE_BIN_DIR="/opt/alt/alt-nodejs20/root/usr/bin"
NPM_PATH="/opt/alt/alt-nodejs20/root/usr/lib/node_modules/corepack/shims/npm"
DEST_DIR="/home/futurebd/manageportal.futuretechaddis.com"

# Add node to the path so npm can find it
export PATH="$NODE_BIN_DIR:$PATH"

echo "--- Dashboard Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $(node -v)" >> $LOG_FILE
echo "Current Directory: $PWD" >> $LOG_FILE

# Install dependencies
echo "Starting npm install..." >> $LOG_FILE
$NPM_PATH install >> $LOG_FILE 2>&1

# Build the project
echo "Starting npm build..." >> $LOG_FILE
$NPM_PATH run build >> $LOG_FILE 2>&1

# Copy files to production
echo "Copying build files to $DEST_DIR..." >> $LOG_FILE
/bin/cp -R build/client/* $DEST_DIR/ >> $LOG_FILE 2>&1

echo "--- Dashboard Deployment Finished Successfully ---" >> $LOG_FILE
