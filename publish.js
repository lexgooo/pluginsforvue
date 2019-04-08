#!/usr/bin/env node

// test process
var shell = require('shelljs')

var url = shell.exec('git remote -v')
var indexs = [url.indexOf('http'), url.indexOf(' (fetch)')]
var addIndex = url.indexOf('.git')
url = url.slice(indexs[0], indexs[1])
url = url.split('.')
url[url.length - 2] = url[url.length -2]+'_dist'
url = url.join('.')

shell.exec(`echo "hello ${url}"`)