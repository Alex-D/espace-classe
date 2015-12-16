'use strict';

var one = require('one-gulp'),
    gulp = require('gulp');

one.init(gulp, {
    scss: {
        preprocess: {
            includePaths: ['./bower_components', './src/assets/stylesheets']
        }
    },

    css: {
        deps: [
            {
                include: ['bower_components/**/*.css'],
                output: 'bower-styles.css'
            },
            {
                include: ['**/*.css'],
                exclude: ['bower_components/**/*.css'],
                output: 'all-styles.css'
            }
        ]
    },

    javascript: {
        deps: [
            {
                include: ['bower_components/**/*.js'],
                output: 'bower-scripts.js'
            },
            {
                include: ['**/*.js'],
                exclude: ['bower_components/**/*.js'],
                output: 'all-scripts.js'
            }
        ]
    },

    watchPaths: [
        'bower_components'
    ]
});


one.unlink(one.sources.javascript).from(one.outputs.browserSync);
one.link(one.sources.javascript).to(one.outputs.writeToDev);

// Remove useless nodes
one.unlink(one.transforms.typescript.preprocess).from(one.outputs.writeToDev);
one.unlink(one.transforms.typescript.preprocess).from(one.transforms.javascript.sortByDepth);
one.remove(one.transforms.typescript.preprocess);
one.unlink(one.transforms.coffeescript.preprocess).from(one.outputs.writeToDev);
one.unlink(one.transforms.coffeescript.preprocess).from(one.transforms.javascript.sortByDepth);
one.remove(one.transforms.coffeescript.preprocess);
one.unlink(one.transforms.jade.preprocess).from(one.transforms.injectDev);
one.unlink(one.transforms.jade.preprocess).from(one.transforms.injectProd);
one.remove(one.transforms.jade.preprocess);
one.unlink(one.transforms.markdown.preprocess).from(one.transforms.injectDev);
one.unlink(one.transforms.markdown.preprocess).from(one.transforms.injectProd);
one.remove(one.transforms.markdown.preprocess);
one.unlink(one.transforms.less.preprocess).from(one.transforms.css.autoprefix);
one.remove(one.transforms.less.preprocess);
one.unlink(one.transforms.stylus.preprocess).from(one.transforms.css.autoprefix);
one.remove(one.transforms.stylus.preprocess);
one.unlink(one.transforms.svg.store).from(one.transforms.svg.inject);
one.remove(one.transforms.svg.rename);
one.remove(one.transforms.svg.minify);
one.remove(one.transforms.svg.inject);
one.remove(one.transforms.svg.store);
one.unlink(one.sources.css).from(one.transforms.css.autoprefix);


var ngOne = {
    ngAnnotate: function (ngSources) {
        var ngAnnotate = require('gulp-ng-annotate');
        return ngSources
            .pipe(ngAnnotate());
    }
};
one.load(ngOne);

one.after(one.sources.javascript).insert(one.transforms.babel.preprocess);
one.before(one.transforms.javascript.minify).insert(ngOne.ngAnnotate);

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src(['**\/*.js', '!node_modules/**\/*.js', '!bower_components/**\/*', '!.one-gulp/**\/*'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});