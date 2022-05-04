#!/bin/bash
# Exit on first error
set -e

# set docker permission
sudo chmod 666 /var/run/docker.sock

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)

CC_SRC_PATH="../healthcare_project/chaincode/"

# clean out any old identites in the wallets
rm -rf server/wallet/*

# launch network; create channel and join peer to channel
pushd ../test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn medicalHistory -ccv 1 -cci initLedger -ccl javascript -ccp ${CC_SRC_PATH}
popd


cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...

Next, use the Healthcare Project applications to interact with the deployed contract.

  Start by changing into the "server" directory:
    cd server

  Next, install all required packages:
    npm install

  Then run the following applications to enroll the admin user, 
  and register a new user called appUser 
  which will be used by the other applications to interact with the deployed contract:
    node enrollAdmin
    node registerUser

  You can run the server application as follows:
    node server
EOF
