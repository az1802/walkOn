module.exports = function (api) {
    api.cache(true);
    console.log(api)
    return {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {},
                    "useBuiltIns": "usage"
                }
            ]
        ],
        "plugins": ["./babelCustonPlugins/visitor.js", "./babelCustonPlugins/loadOnDemand.js"]
    }
}