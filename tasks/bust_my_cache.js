/*
 Based on https://github.com/hollandben/grunt-cache-bust by Ben Holland. Added options to filter which file gets updated.
 grunt-bust-my-cache
 
 https://github.com/jrutter/grunt-bust-my-cache
 *
 * Copyright (c) 2014 Jake Rutter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var fs      = require('fs');
    var path    = require('path');
    var cheerio = require('cheerio');

    var remoteRegex    = /http:|https:|\/\/|data:image/;
    var extensionRegex = /(\.[a-zA-Z]{2,4})(|\?.*)$/;

    var regexEscape = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    var cheerioOptions = {
        ignoreWhitespace: true,
        lowerCaseTags: true
    };

    var options = {
        baseDir: './',
        filter: '',
        fileType : ''
    };

    var checkIfRemote = function() {
        return remoteRegex.test(this.attr('src')) || remoteRegex.test(this.attr('href'));
    };

    var checkIfHasExtension = function() {
        return extensionRegex.test(this.attr('src')) || extensionRegex.test(this.attr('href'));
    };

    var checkIfValidFile = function() {
        return !checkIfRemote.call(this) && checkIfHasExtension.call(this);
    };

    var findStaticAssets = function(data) {
        var $ = cheerio.load(data, cheerioOptions);

        // Add any conditional statements or assets in comments to the DOM
        var assets = '';

        $('head, body').contents().filter(function(){
            return this[0].type === 'comment';
        }).each(function(i, e) {
            assets += e.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
        });


        $('body').append(assets);

        var scripts = $('script').filter(checkIfValidFile).map(function() { return this.attr('src'); });
        var stylesheets = $('link[rel="stylesheet"]').filter(checkIfValidFile).map(function() { return this.attr('href'); });

        return [].concat(scripts, stylesheets);
    };

    grunt.file.defaultEncoding = options.encoding;

    grunt.registerMultiTask('bustMyCache', 'Bust static assets from the cache using content hashing', function() {

        var opts = grunt.util._.defaults(this.options(), options);

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var markup = grunt.file.read(filepath);
                                
                findStaticAssets(markup).forEach(function(reference) {
                    var filePath   = opts.baseDir;
                    var newFilename;
                    var filter = opts.filter;
                    var filterIndex = reference.indexOf(filter);

                    // Cache bust paths equal to the filter
                    if(opts.filter) {
                        
                        // If Filter Being Used
                        if(filterIndex > -1) {
                            newFilename = filePath + filter + '?d=' + Date.now();
                            grunt.log.error(newFilename);
                            markup = markup.replace(new RegExp(regexEscape(reference), 'g'), newFilename);
                        }
                    }
                    // Cache bust all paths
                    else {
                        newFilename = reference.split('?')[0] + '?d=' + Date.now();
                        grunt.log.error(newFilename);
                        markup = markup.replace(new RegExp(regexEscape(reference), 'g'), newFilename);  
                    }
                                            
                });
                grunt.file.write(filepath, markup);
                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};
