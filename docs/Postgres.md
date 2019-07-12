# Postgres Setup

1. Install Postgresql
    - brew install postgresql
    - brew services start postgresql
    - [Create user with password](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
        - psql postgres
        - \du
        - CREATE ROLE test WITH LOGIN PASSWORD 'Password123';
        - ALTER ROLE test CREATEDB;
        - \du
        - exit
    - createdb -U test postgres
    - createdb -U test postgres-test

- https://www.postgresql.org/docs/9.3/server-start.html