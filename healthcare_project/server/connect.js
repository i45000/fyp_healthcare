const {
    Gateway,
    Wallets
} = require('fabric-network');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:  'fyp_healthcare',
});

function x509IdentitySetup(enrollment) {
    return x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
}

async function walletSetup() {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    return wallet
}

function networkConfigurationSetup() {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    return ccp
}

async function gatewaySetup() {
    const wallet = await walletSetup();

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const ccp = networkConfigurationSetup();

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: {
            enabled: true,
            asLocalhost: true
        }
    });

    return gateway
}

module.exports = { x509IdentitySetup , networkConfigurationSetup , walletSetup , gatewaySetup , db };