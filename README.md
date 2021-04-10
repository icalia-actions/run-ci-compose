# Run ci-compose

Runs a Docker Compose service defined in a custom compose file called "ci-compose.yml"

## Usage

Given the following `docker-compose.yml` file - your case may vary:

```yaml
version: "3.7"

volumes:
  postgres_data:

services:
  postgres:
    image: postgres:13-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: 3x4mpl3P455w0rd
```

And given the following `ci-compose.yml` file exists:

```yaml
version: "3.7"

services:
  tests:
    image: my-namespace/my-app:testing
    build:
      context: .
      target: testing
    depends_on:
      - postgres
    command: rspec
    volumes:
      - .:/demo
    environment:
      RAILS_ENV: test
      DATABASE_URL: postgres://postgres:3x4mpl3P455w0rd@postgres:5432/?encoding=unicode
```

### Github Action Usage

```yaml
      - name: Run Tests
        uses: icalia-actions/run-ci-compose@v0.0.1
        with:
          service-name: tests
```

### Library Usage

```
yarn add --dev @icalialabs/run-ci-compose
```