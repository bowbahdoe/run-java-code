#!/bin/bash

set -euv -o pipefail

cd "base"

image_name="playground-latest"
# full_name="${repository}/${image_name}"
full_name="${image_name}"

docker build -t "playground-valhalla"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.java.net/java/early_access/valhalla/20/openjdk-20-valhalla+20-75_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=cd0a008aee632cbff2f9c529aba17f4ad7f733cd974d36d2293169bc35e73ae7\
    --build-arg TARGZ_FOLDER=jdk-20\
    .

docker build -t "playground-latest"\
    --platform linux/amd64\
    --build-arg TARGZ_URL=https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.tar.gz\
    --build-arg TARGZ_SHA=36cd5e9661360a8fece4fd31cf678cd6611f3742633dab3b3244e037ba0b095f \
    --build-arg TARGZ_FOLDER=jdk-21\
    .


#channels_to_build="${CHANNELS_TO_BUILD-stable beta nightly}"
#perform_push="${PERFORM_PUSH-false}"
#
#repository=shepmaster



#
#for channel in $channels_to_build; do
#    cd "base"
#
#    image_name="rust-${channel}"
#    full_name="${repository}/${image_name}"
#
#    docker pull "${full_name}" || true
#    docker pull "${full_name}:munge" || true
#
#    # Prevent building the tool multiple times
#    # https://github.com/moby/moby/issues/34715
#    docker build -t "${full_name}:munge" \
#           --target munge \
#           --cache-from "${full_name}" \
#           --cache-from "${full_name}:munge" \
#           --build-arg channel="${channel}" \
#           .
#
#    docker build -t "${full_name}:sources" \
#           --target sources \
#           --cache-from "${full_name}" \
#           --cache-from "${full_name}:munge" \
#           --build-arg channel="${channel}" \
#           .
#
#    docker build -t "${full_name}" \
#           --cache-from "${full_name}" \
#           --cache-from "${full_name}:munge" \
#           --build-arg channel="${channel}" \
#           .
#
#    docker tag "${full_name}" "${image_name}"
#
#    if [[ "${perform_push}" == 'true' ]]; then
#        docker push "${full_name}:munge"
#        docker push "${full_name}:sources"
#        docker push "${full_name}"
#    fi
#
#    cd ..
#done
#
#crate_api_base=https://crates.io/api/v1/crates



