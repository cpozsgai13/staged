#!/bin/bash

#  Creates x509 keys
openssl req -x509 -nodes -days 36500 -newkey rsa:4096 -keyout staged.key -out staged.crt  -subj "/CN=localhost"


#  From Copilot
#openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
