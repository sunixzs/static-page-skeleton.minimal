#!/bin/bash

# Shortcut to publish generated output with rsync and ssh

#rsync -avze 'ssh -p 22' production/ domain.tld:public/
rsync -avze 'ssh -p 22' --delete production/ domain.tld:public/
if [ $? -ne 0 ]; then echo "Could not publish the site"; exit 1; fi
