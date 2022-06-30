#!/bin/sh
export REPO_NAME=gdash
export PARENT_PROJECT=gmetri #Controls the network name

export REPO_FOLDER=`git rev-parse --show-toplevel`
export SHORT_REF=`git rev-parse --short HEAD`
