#!/bin/sh
. ./fab/sh/constants.sh

docker compose \
    -f fab/d/docker-compose.yaml \
    --project-name ${REPO_NAME} \
    --project-directory ${REPO_FOLDER} \
    down
