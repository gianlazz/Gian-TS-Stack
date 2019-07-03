FROM node:8.11-stretch

RUN apt-get update

RUN apt-get install -y postgresql

RUN apt-get -y install curl
RUN curl -fsSL get.docker.com -o get-docker.sh
RUN sh get-docker.sh
RUN curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose