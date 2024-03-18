const path = require('path');

module.exports = {
    mode: 'production',
    entry: './content.js',
    output: {
        filename: 'content_bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-module-source-map',
};
