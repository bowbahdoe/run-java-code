#syntax=docker/dockerfile:1.5

FROM maven:3.9.4-amazoncorretto-21-al2023 AS dependencies

COPY pom.xml pom.xml

RUN mvn dependency:copy-dependencies


FROM ubuntu:20.04 as jre

ARG TARGZ_URL
ARG TARGZ_SHA
ARG TARGZ_FOLDER

RUN apt update && apt install -y wget

RUN wget "$TARGZ_URL" -O openjdk.tgz
RUN echo "$TARGZ_SHA *openjdk.tgz" | sha256sum --strict --check -

# Extract the JDK
RUN tar -xzvf openjdk.tgz

RUN cp -r $TARGZ_FOLDER jre

FROM ubuntu:20.04

ENV DEBIAN_FRONTEND="noninteractive"

RUN rm -rf /var/lib/apt/lists/*

RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root

# Attach the security note
ADD --chown=playground attach_notice.sh security_notice.txt /playground/
RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
    rm -f /playground/attach_notice.sh

COPY --chown=playground --from=dependencies target/dependency /playground/dependencies
COPY --chown=playground --from=jre jre /playground/jre

USER playground
ENV USER=playground
ENV PATH=/playground/jre/bin:$PATH
WORKDIR /playground

ADD --chown=playground entrypoint.sh /playground/tools/

ADD --chown=playground postinstall.sh /playground/tools/
RUN /playground/tools/postinstall.sh

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
