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
    --build-arg TARGZ_URL=https://download.java.net/java/GA/jdk22/830ec9fcccef480bb3e73fb7ecafe059/36/GPL/openjdk-22_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=4d65cc6ed28711768fd72c2043a7925f7c83f5f51bb64970bd9d52f7791fc6ac\
    --build-arg TARGZ_FOLDER=jdk-22\
    .

docker build -t "javaplayground/early_access"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/jdk23/14/GPL/openjdk-23-ea+14_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=9305399006d6c477d1c84cc48d42d44839199f603c1802298225c13160f1d9d2 \
    --build-arg TARGZ_FOLDER=jdk-23\
    .


if [[ "${perform_push}" == 'true' ]]; then
    docker push "javaplayground/valhalla"
    docker push "javaplayground/latest"
    docker push "javaplayground/early_access"
fi