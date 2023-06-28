#!/bin/sh

set -ex

SCRIPTPATH=$(dirname "$(realpath "$0")")
PROJECTPATH="${SCRIPTPATH}/.."

rm -rf "${PROJECTPATH}/abi"
mkdir -p "${PROJECTPATH}/abi"

find "${PROJECTPATH}/abi" -name '*.abi' -exec sh -c 'contract=$(basename "$1"); echo "export const ${contract%.abi}Abi = " | cat - "$1" > "${1%.abi}.ts"; echo " as const;" >> ${1%.abi}.ts; rm "$1";' _ {} \;

prettier --write "${PROJECTPATH}/abi/*.ts"
