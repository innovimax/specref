#!/usr/bin/env node
var fs = require('fs');
var json = require('../lib/bibref').all;
var keys = Object.keys(json);
var path = require('path');
var FILE = path.join(__dirname, "..", "test", "ref-list.json");

var output = JSON.parse(fs.readFileSync(FILE, 'utf8'));

function add(k) {
    if (output.indexOf(k) < 0) {
        output.push(k);
    }
}

keys.forEach(function(key) {
    add(key);
    var value = json[key];
    if (typeof value == "object" && json.versions) {
        Object.keys(json.versions).forEach(function(k) {
            add(key + "-" + k);
        });
    }
});

output.sort(function(a, b) { return a.localeCompare(b); });

console.log("Writing output to " + FILE + "...");
fs.writeFileSync(FILE, JSON.stringify(output, null, 4) + "\n", 'utf8');