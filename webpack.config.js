const path = require("path");

module.exports = {
    entry: "/octoprint_virtual_printerconfig/static/src/virtual_printerconfig.js",
    output: {
        filename: "virtual_printerconfig.js",
        path: path.resolve(__dirname, "octoprint_virtual_printerconfig/static/dist"),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
