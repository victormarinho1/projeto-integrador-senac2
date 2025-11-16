#!/usr/bin/bash
docker network create projeto_integrador
docker compose down && docker compose build && docker compose up -d