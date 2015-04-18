var assert = require('assert'),
    fs = require('fs'),
    path = require('path');

var current = require('../lib/bibref');

var previous = JSON.parse(fs.readFileSync(path.join(__dirname, 'ref-list.json'), 'utf8'));

suite("Previous references are maintained", function() {
    previous.forEach(function(key) {
        test("Reference [[" + key + "]] is maintained.", function() {
            assert.ok(current.get(key)[key]);
        });
    });
});
