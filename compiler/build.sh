#!/bin/bash

set -euv -o pipefail

cd "base"

perform_push="${PERFORM_PUSH-false}"

docker build -t "javaplayground/valhalla"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/valhalla/20/openjdk-20-valhalla+20-75_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=cd0a008aee632cbff2f9c529aba17f4ad7f733cd974d36d2293169bc35e73ae7\
    --build-arg TARGZ_FOLDER=jdk-20\
    .

docker build -t "javaplayground/latest"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/GA/jdk21.0.1/415e3f918a1f4062a0074a2794853d0d/12/GPL/openjdk-21.0.1_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=7e80146b2c3f719bf7f56992eb268ad466f8854d5d6ae11805784608e458343f \
    --build-arg TARGZ_FOLDER=jdk-21\
    .

docker build -t "javaplayground/early_access"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/jdk22/20/GPL/openjdk-22-ea+20_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=5f1627efa81951307900954bbf7b2e49d8c5303615cf116959c273e9707b0496 \
    --build-arg TARGZ_FOLDER=jdk-22\
    .


if [[ "${perform_push}" == 'true' ]]; then
    docker push "javaplayground/valhalla"
    docker push "javaplayground/latest"
    docker push "javaplayground/early_access"
fi