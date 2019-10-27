const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css');

/**
 * This configuration is capable of parsing following file types:
    Sass and css files
    Font files (.eot, .woff, .woff2)
    Image files (.png, jpg, .gif, .svg)

    https://dev.to/harveyjones282/the-simplest-way-to-configure-next-js-with-sass-3en

 */
module.exports = withCSS(withSass({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        return config;
    }
}));