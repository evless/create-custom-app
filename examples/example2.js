module.exports = function () {
    var indexHTML = 
`<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\"/>
        <title>Create App</title>
        <base href=\"/\">
    </head>
    <body>
        <div id=\"body\"></div>
    </body>
</html>`;

    return {
        folders: [
            'client/app',
            'client/public/css',
            'client/public/images',
            'client/templates'
        ],
        files: {
            fileName: 'client/templates/index.html',
            content: indexHTML
        }
    };
};