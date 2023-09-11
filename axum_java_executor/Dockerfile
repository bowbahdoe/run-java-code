# Use a Debian image for building and running
FROM debian:bullseye-slim as build

# Set the working directory
WORKDIR /usr/src/axum_java_executor

# Copy the HelloWorld.java file into the container
COPY HelloWorld.java .

# Install build essentials, Rust, and Java
RUN apt update && \
    apt install -y build-essential curl openjdk-11-jdk && \
    curl https://sh.rustup.rs -sSf | sh -s -- -y

# Add Rust to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy the source code
COPY . .

# Build the application
RUN cargo build --release

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the API
CMD ["./target/release/axum_java_executor"]
