Hi 👋🏻

## Prerequisites

Before you get started, make sure you have the following installed on your machine:

- Docker
- Docker Compose

If you don't have them installed already, you can find installation instructions on the official Docker website:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To run `Parcels`, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/orkhanrustamli/parcels.git
    ```

2. Navigate to the project directory:

    ```bash
    cd parcels
    ```

3. Run the following command to build and start the service:

    ```bash
    docker-compose up --build
    ```

That's it! Once the Docker containers are up and running, you can access the service on `http://localhost:3000`.

## Note: Client-side Tests

Tests for the client-side code have not been implemented due to time constraints.
