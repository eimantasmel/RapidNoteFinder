const path = require('path');

module.exports = {
    mode: 'production',
    entry: './content.js',
    output: {
        filename: 'content_bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
};
