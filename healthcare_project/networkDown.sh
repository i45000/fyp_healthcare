set -ex

# Bring the test network down
pushd ../test-network
./network.sh down
popd

# clean out any old identites in the wallets
rm -rf server/wallet/*