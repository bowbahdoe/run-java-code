#!/bin/bash

set -euv -o pipefail

cd "base"

perform_push="${PERFORM_PUSH-false}"

docker build -t "javaplayground/valhalla"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/valhalla/1/openjdk-23-valhalla+1-90_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=5235afaf5ecc86f2237458cf40f8ed965939372f606edbd0fc46e1ee2e69f5f5\
    --build-arg TARGZ_FOLDER=jdk-23\
    .

docker build -t "javaplayground/latest"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/GA/jdk25/bd75d5f9689641da8e1daabeccb5528b/35/GPL/openjdk-25_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=c00224c25b0b915f4d69929d90e59dfd66e949f79f7437d334248f7789b646f4\
    --build-arg TARGZ_FOLDER=jdk-25\
    .

docker build -t "javaplayground/early_access"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/jdk26/10/GPL/openjdk-26-ea+10_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=09044ebef2f1122e484e84df3a95605462c66caf6fb6363a6b3bb70cb6dba3db\
    --build-arg TARGZ_FOLDER=jdk-26\
    .


if [[ "${perform_push}" == 'true' ]]; then
    docker push "javaplayground/valhalla"
    docker push "javaplayground/latest"
    docker push "javaplayground/early_access"
fi
