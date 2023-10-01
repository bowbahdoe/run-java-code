#syntax=docker/dockerfile:1.5
FROM maven:3.9.4-amazoncorretto-21-al2023 AS dependencies



FROM ${BASE_IMAGE} as jre

ARG BASE_IMAGE

RUN jlink --add-modules ALL-MODULE-PATH --output jre


FROM ubuntu:20.04 as sources

ENV DEBIAN_FRONTEND="noninteractive"

RUN rm -rf /var/lib/apt/lists/*

RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root

# Attach the security note
ADD --chown=playground attach_notice.sh security_notice.txt /playground/
RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
    rm -f /playground/attach_notice.sh

COPY --chown=playground --from=jre jre /playground/jre

USER playground
ENV USER=playground
ENV PATH=/playground/jre/bin:$PATH
WORKDIR /playground

ADD --chown=playground entrypoint.sh /playground/tools/

# Compiler and pre-compiled crates

FROM sources

ARG channel

ADD --chown=playground postinstall.sh /playground/tools/
RUN /playground/tools/postinstall.sh

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
