# Make sure that IP Addresses are setup properly
# Use PUBLIC IP Here

export ORDERER_ADDRESS=18.221.28.108:7050
export ACME_EP=3.15.143.119:7051
export BUDGET_EP=18.188.162.107:7051
export FABRIC_CFG_PATH=$PWD

export CORE_PEER_MSPCONFIGPATH=./crypto-config/peerOrganizations/acme.com/users/Admin@acme.com/msp
export CORE_PEER_ADDRESS=$ACME_EP
export CORE_PEER_LOCALMSPID=AcmeMSP


# Test Chaincode related properties
export CC_CONSTRUCTOR='{"Args":["init","a","100","b","200"]}'
export CC_NAME="gocc1"
export CC_PATH="chaincode_example02"
export CC_VERSION="1.0"
export CC_CHANNEL_ID="airlinechannel"
export CC_LANGUAGE="golang"

# Version 2.x
export INTERNAL_DEV_VERSION="1.0"
export CC2_PACKAGE_FOLDER="$HOME/packages"
export CC2_SEQUENCE=1
export CC2_INIT_REQUIRED="--init-required"

# Create the package with this name
export PACKAGE_NAME="$CC_NAME.$CC_VERSION-$INTERNAL_DEV_VERSION.tar.gz"
# Extracts the package ID for the installed chaincode
export LABEL="$CC_NAME.$CC_VERSION-$INTERNAL_DEV_VERSION"



export FABRIC_LOGGING_SPEC=info

function usage {
    echo  "Usage: . ./set-env.sh    ORG_NAME"
    echo  "Sets the environment for the specific org"
}

export CURRENT_ORG_NAME=$1

echo "Setting environment for $CURRENT_ORG_NAME"

# Set environment variables based on the ORG_Name
case $CURRENT_ORG_NAME in
    "acme")   export CORE_PEER_MSPCONFIGPATH=./crypto-config/peerOrganizations/acme.com/users/Admin@acme.com/msp
              export CORE_PEER_ADDRESS=$ACME_EP
              export CORE_PEER_LOCALMSPID=AcmeMSP
        ;;
    "budget") export CORE_PEER_MSPCONFIGPATH=./crypto-config/peerOrganizations/budget.com/users/Admin@budget.com/msp
              export CORE_PEER_ADDRESS=$BUDGET_EP
              export CORE_PEER_LOCALMSPID=BudgetMSP
        ;;

    *) usage
esac