#!/bin/bash

set -euv -o pipefail

repository=shepmaster

for image in rust-stable rust-beta rust-nightly rustfmt clippy miri; do
    docker pull "${repository}/${image}"
    # The backend expects images without a repository prefix
    docker tag "${repository}/${image}" "${image}"
done

for image in eclipse-temurin:19; do
    docker pull "${image}"
    # The backend expects images without a repository prefix
    docker tag "${image}" "${image}"
done
