module.exports = function() {
    var thenContent = 
`module.exports = function() {
    this.Then(/^Я что-то ожидаю$/, {}, require('../support/test.js'))
}`;

    return {
        folders: [
            'features/test/',
            'steps/',
            'support/'
        ],
        files: [
            {
                fileName: 'features/test/feature_test.feature',
                content: 'Feature: Тестовая фича'
            },
            {
                fileName: 'steps/then.js',
                content: thenContent
            },
            {
                fileName: 'support/test.js',
                content: 'module.exports = function() {}'
            }
        ]
    };
};