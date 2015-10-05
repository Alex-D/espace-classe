'use script';

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