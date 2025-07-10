#!/bin/bash

#  List keytool.p12 from files
keytool -list -v -keystore ./keystore.p12 -storetype PKCS12
