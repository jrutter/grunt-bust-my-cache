var grunt = require('grunt');

exports.bustMyCache = {

    inlcudes: function(test) {
        test.expect(7);

        var assets = grunt.file.read('tmp/default.html');
        
        test.ok(assets.match(/script1\.js\?[d]\W+\d{13}/), 'testing script1');
        test.ok(assets.match(/stylesheet1\.css\?[d]\W+\d{13}/), 'testing stylesheet1');

        test.ok(assets.match(/href="\/\/netdna.bootstrapcdn.com\/twitter-bootstrap\/2.3.2\/css\/bootstrap-combined.min.css"/), 'remotely hosted // syntax should remain untouched');

        test.ok(assets.match(/href="http:\/\/twitter.github.com\/bootstrap\/assets\/css\/bootstrap.css"/), 'remotely hosted https:// syntax should remain untouched');

        test.ok(assets.match(/src="\/\/ajax.googleapis.com\/ajax\/libs\/angularjs\/1.0.6\/angular.min.js"/), 'remotely hosted // syntax should remain untouched');
        test.ok(assets.match(/src="https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.10.2\/jquery.min.js"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(assets.match(/src="http:\/\/code.jquery.com\/qunit\/qunit-1.12.0.js"/), 'remotely hosted http:// syntax should remain untouched');        

        test.done();
    },
};
