#!/usr/bin/env bash

cd producer
npm install
npm run build
cd ..

cd consumer
npm install
npm run build
cd ..

cd app
npm install
cdk deploy  --require-approval never
