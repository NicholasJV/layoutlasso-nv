var app = angular.module('LayoutLasso');
app.factory('BrowserifyFactory', function() {
    var BrowserifyFactory = {};

    BrowserifyFactory.beautifyHTML = require('js-beautify').html;
    BrowserifyFactory.beautifyCSS = require('js-beautify').css;

    return BrowserifyFactory;
})
