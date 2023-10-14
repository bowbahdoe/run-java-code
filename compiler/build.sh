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
    --build-arg TARGZ_URL=https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=36cd5e9661360a8fece4fd31cf678cd6611f3742633dab3b3244e037ba0b095f \
    --build-arg TARGZ_FOLDER=jdk-21\
    .

docker build -t "javaplayground/early_access"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/jdk22/19/GPL/openjdk-22-ea+19_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=70bc0434cc0a8e1fa5351daa062cdd86b29caa784525f22e8a0cc0028e34a157 \
    --build-arg TARGZ_FOLDER=jdk-22\
    .


if [[ "${perform_push}" == 'true' ]]; then
    docker push "javaplayground/valhalla"
    docker push "javaplayground/latest"
    docker push "javaplayground/early_access"
fi