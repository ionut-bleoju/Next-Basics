const path = require('path')

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                AuthChecker: isServer ? path.join(__dirname,'./lib/serverChecker.js') : path.join(__dirname, './lib/clientChecker.js'),
            }
        }

        return config
    },
    webpackDevMiddleware: config => {
        // Perform customizations to webpack dev middleware config
        // Important: return the modified config

        return config
    },
}