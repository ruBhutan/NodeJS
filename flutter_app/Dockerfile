# Use an official Flutter image from CirrusLabs that supports ARM64
FROM ghcr.io/cirruslabs/flutter:latest

# Install required dependencies
RUN apt-get update && \
    apt-get install -y curl git unzip xz-utils libglu1-mesa && \
    apt-get clean

# Set Flutter version
ENV FLUTTER_VERSION=3.10.0

# Download and install Flutter SDK
RUN curl -L https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}-stable.tar.xz | tar -xJ -C /usr/local

# Add Flutter to PATH
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:$PATH"

# Enable Flutter web
RUN flutter config --enable-web

# Copy app source code
COPY . /app

# Set working directory
WORKDIR /app

# Get dependencies
RUN flutter pub get

# Build the app
RUN flutter run

# Expose port
EXPOSE 8080

# Serve the app
CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080"]
