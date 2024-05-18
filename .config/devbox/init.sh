#!/bin/bash

check_port() {
	port=$1
	if lsof -i :$port | grep LISTEN >/dev/null; then
		return 0
	else
		return 1
	fi
}

if ! check_port 5173; then
	npm install
fi
