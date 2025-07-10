#!/bin/bash

#  Creates keytool.p12 from files
openssl pkcs12 -export -inkey ./staged.key -in ./staged.crt -out keystore.p12 -name stagedcert
