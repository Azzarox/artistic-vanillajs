const path = require('path');

module.exports = {
    entry: ['./src/app.js', './src/server.js', './src/searchUI.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
};
