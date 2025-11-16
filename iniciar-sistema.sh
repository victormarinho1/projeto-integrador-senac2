#!/usr/bin/bash
cd backend
./iniciar-sistema.sh
cd ..
cd frontend
npm install
ng serve