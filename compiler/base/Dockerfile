#syntax=docker/dockerfile:1.5

FROM ubuntu:20.04 as toolchain

ARG channel

ENV DEBIAN_FRONTEND="noninteractive"

# `build-essential` and `file` are needed for backtrace-sys
# `cmake`, `git`, `python` are needed for wasm tools
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    libssl-dev \
    pkg-config \
 && rm -rf /var/lib/apt/lists/*

RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root

# Attach the security note
ADD --chown=playground attach_notice.sh security_notice.txt /playground/
RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
    rm -f /playground/attach_notice.sh

USER playground
ENV USER=playground
ENV PATH=/playground/.cargo/bin:$PATH
WORKDIR /playground

ADD --chown=playground entrypoint.sh /playground/tools/

# Fetch all the crate source files

FROM toolchain as bare-sources

RUN cargo init /playground

# Compiler and sources

FROM bare-sources as sources


# Compiler and pre-compiled crates

FROM sources

ARG channel

RUN cargo build
RUN cargo build --release
RUN rm src/*.rs

ADD --chown=playground postinstall.sh /playground/tools/
RUN /playground/tools/postinstall.sh ${channel}
ADD --chown=playground cargo-wasm /playground/.cargo/bin/

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
