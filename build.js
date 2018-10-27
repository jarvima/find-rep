const webpack = require('webpack');

const webpackConfig = {
    entry: {
        'find-rep': './web/find-rep-app.jsx',
    },
    output: {
        path: `${__dirname}/public/dist`,
        publicPath: 'dist',
        filename: 'find-rep-app.js',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules\/.*/],
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'babel-plugin-transform-decorators-legacy',
                        'babel-plugin-transform-class-properties',
                        'babel-plugin-transform-decorators-legacy',
                        'babel-plugin-transform-object-rest-spread',
                    ].map(require.resolve),
                    presets: ['es2015', 'react'],
                },
            }],
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    mode: 'development',
    node: {
        fs: 'empty',
    },

    devtool: 'cheap-module-eval-source-map',
    target: 'web',

    watchOptions: {
        ignored: [
            '*/node_modules/*',
        ],
    },
};

const runWebpack = watch => {
    const config = { ...webpackConfig };
    config.watch = watch;
    let execCount = 0;

    console.log('running webpack...');
    return new Promise(resolve => {
        webpack(config, (err) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log('webpack exec count:', ++execCount);
                resolve();
            }
        });
    });
}

const options = {
    bundle: () => runWebpack(false),
    watch: () => runWebpack(true),
};
const action = process.argv[2];

Promise.resolve().then(() => options[action]())
.then(() => {
    if (action !== 'watch') {
        process.exit(0);
    }
}).catch(err => {
    console.log(err);
    process.exit(1);
});
