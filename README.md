# grunt-bust-my-cache

> Bust static assets from the cache using date.now() along with the ability to target specific files. 

[![Build Status](https://travis-ci.org/jrutter/grunt-bust-my-cache.png?branch=master)](https://travis-ci.org/jrutter/grunt-bust-my-cache)

## Getting Started

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bust-my-cache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bust-my-cache');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The "bustMyCache" task

Use the **bustMyCache** task for cache busting static files in your application. This allows them to be cached forever by the browser, just point the task towards any file that contains references to static assets.

_Currently supported static assets: **CSS** & **JavaScript**.

_Note:_ Remote URLs for CSS and JavaScript are ignored by bustMyCache.  This assumes that remote URLs for these assets will
be CDN hosted content, typically for well known libraries like jQuery or Bootstrap.  These URLs typically include a version
identifier in the URL to deal with browser caching, and it is in the best interest of your app to use the standard URL as-is
to ensure browser cache hits for popular libraries.  For example, all of below URLs will be ignored:

```html
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
<link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>

```

### Overview
In your project's Gruntfile, add a section named `bustMyCache` to the data object passed into `grunt.initConfig()`.

```js
bustMyCache: {
  default: { 
    options: {
      filter: 'global.css'
    },
    files: {
        'src/pageHeader.jsp':'dist/pageHeader.jsp'
    }
  }
}
```

### Options

#### options.filter
Type: `String`
Default value: `false`

Allow you to pass a path to a specific file to be cache busted, useful if you don't want to blow away the cache on all of your files.


### Usage Examples

#### Basic Asset Cache Busting

```js
grunt.initConfig({
  bustMyCache: {
    default: { 
      files: {
          'src/pageHeader.jsp':'dist/pageHeader.jsp'
      }
    }
  }
})
```

#### Basic Asset Cache Busting with different configs

```js
grunt.initConfig({
  bustMyCache: {
    global_css: { 
      options: {
        filter: 'global.css'
      },
      files: {
      'src/pageHeader.jsp':'dist/pageHeader.jsp'
      }
    },
    product_css: { 
      options: {
        filter: 'product.css'
      },
      files: {
      'src/pageHeader.jsp':'dist/pageHeader.jsp'
      }
    }
  },
})
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v2.0 - Rewrote plugin from ground up and setup new unit tests.

