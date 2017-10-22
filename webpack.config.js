module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "index.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [
            ".ts",
            ".json"
        ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};

