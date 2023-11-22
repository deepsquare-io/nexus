# Nexus: The DeepSquare Portal of Apps

The Nexus is the official Portal hosting apps for DeepSquare.

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/deepsquare-io/nexus.git
   ```

2. Install dependencies:

   ```shell
   pnpm install
   ```

3. Run:

   ```shell
   # Start MongoDB
   docker-compose up -d
   pnpm run dev
   ```

For production preview:

3. Edit the .env.production and run:

   ```shell
   pnpm run test:build
   pnpm run test:start
   ```

## Join the Community

- [Community Discord](https://discord.gg/8XXDR4MAzy) - Request for support and help from the DeepSquare community.
- [GitHub Issues](https://github.com/deepsquare-io/nexus/issues) - Submit your issues and feature requests via GitHub.

We welcome your help in building DeepSquare! If you are interested, we invite you to check
out the [Contributing Guide](./CONTRIBUTING.md).

## Documentation

Comprehensive details, tutorials, and reference materials are available at our [Documentation](https://docs.deepsquare.run/). Whether you're a new user getting started or an experienced developer looking for in-depth information, our documentation is the go-to resource to explore the full potential of DeepSquare.
