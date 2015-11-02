'use strict';

angular.module('espaceClasse.common')

    .factory('StorageService', function () {
        return {
            setItem: function (key, value) {
                return localStorage.setItem(key, JSON.stringify(value));
            },
            getItem: function (key, defaultValue) {
                let value = localStorage.getItem(key);
                return value != null ? JSON.parse(value) : defaultValue;
            },
            hasItem: function (key) {
                return this.getItem(key) != null;
            },
            removeItem: function (key) {
                return localStorage.removeItem(key);
            }
        };
    });