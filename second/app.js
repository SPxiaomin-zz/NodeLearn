var express = require('express');
var marked = require('marked');
var pygmentize =  require('pygmentize-bundled');
var fs = require('fs');
var app = express();

marked.setOptions({
    highlight: function ( code, lang, callback ) {
        pygmentize({ lang: lang, format: 'html' }, code, function( err, result ) {
            callback( err, result.toString());
        });
    }
});

function markdown2html( data, callback ) {
    marked( data, function ( err, content ) {
        return callback( err, content );
    });
}

app.get('/', function( req, res ) {
    fs.readFile('./blogs/test.md', 'utf-8', function( err, data ) {
        if ( err ) {
            res.send( err );
        }

        markdown2html( data, function ( err, content ) {
            if ( err ) {
                res.send( err );
            }

            res.send( content );
        });
    });
});

app.listen(3000);

console.log('Server start: http://localhost:3000');
