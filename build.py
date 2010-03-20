#!/usr/bin/env python
import os
import simplejson

json = simplejson.loads(open('package.json').read())
cmd = 'cfx xpi'
if json['updateURL']:
    cmd += ' -u ' + json['updateURL']

if json['updateLink']:
    cmd += ' -l ' + json['updateLink']

print cmd
os.system(cmd)
