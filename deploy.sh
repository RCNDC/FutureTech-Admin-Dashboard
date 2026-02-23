#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths for Node 20
NODE_BIN_DIR="/opt/alt/alt-nodejs20/root/usr/bin"
NPM_SHIM_PATH="/opt/alt/alt-nodejs20/root/usr/lib/node_modules/corepack/shims/npm"
DEST_DIR="/home/futurebd/manageportal.futuretechaddis.com"

# Add node to the path
export PATH="$NODE_BIN_DIR:$PATH"

# cPanel environments can have low virtual-memory limits; this avoids
# WebAssembly trap-handler 10GB virtual cage allocation failures.
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--disable-wasm-trap-handler --max-old-space-size=512"

# Prefer the packaged npm binary to avoid Corepack bootstrap overhead.
if [ -x "$NODE_BIN_DIR/npm" ]; then
  NPM_CMD="$NODE_BIN_DIR/npm"
else
  NPM_CMD="$NPM_SHIM_PATH"
fi

echo "--- Dashboard Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $(node -v)" >> $LOG_FILE
echo "npm version: $($NPM_CMD -v)" >> $LOG_FILE
echo "Current Directory: $PWD" >> $LOG_FILE
echo "NODE_OPTIONS: $NODE_OPTIONS" >> $LOG_FILE
echo "ulimit -u: $(ulimit -u 2>/dev/null || echo n/a)" >> $LOG_FILE

# Install dependencies
if [ -f package-lock.json ]; then
  echo "Starting npm ci..." >> $LOG_FILE
  $NPM_CMD ci --no-audit --no-fund >> $LOG_FILE 2>&1
else
  echo "Starting npm install..." >> $LOG_FILE
  $NPM_CMD install --no-audit --no-fund >> $LOG_FILE 2>&1
fi

# Build the project (retry to survive transient cPanel process limits)
echo "Starting npm build..." >> $LOG_FILE
BUILD_OK=0
for ATTEMPT in 1 2 3; do
  if $NPM_CMD run build >> $LOG_FILE 2>&1; then
    BUILD_OK=1
    break
  fi

  echo "Build attempt ${ATTEMPT}/3 failed." >> $LOG_FILE
  if [ "$ATTEMPT" -lt 3 ]; then
    echo "Retrying build in 10 seconds..." >> $LOG_FILE
    sleep 10
  fi
done

if [ "$BUILD_OK" -ne 1 ]; then
  echo "Build failed after 3 attempts." >> $LOG_FILE
  exit 1
fi

# Copy files to production
echo "Copying build files to $DEST_DIR..." >> $LOG_FILE
/bin/cp -R build/client/* $DEST_DIR/ >> $LOG_FILE 2>&1

echo "--- Dashboard Deployment Finished Successfully ---" >> $LOG_FILE
