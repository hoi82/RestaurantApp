require("@babel/register")({
    plugins: [
        [
            "babel-plugin-css-modules-transform",
            {
                generateScopedName: "[hash:base64:5]",
                extensions: [".css", ".scss"]
            }
        ],
    ]
});
require("@babel/polyfill");
require("./src/server");