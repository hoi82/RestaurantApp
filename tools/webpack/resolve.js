export const getResolve = () => {
    return {
        extensions: [".js", ".jsx"],
        alias: { "react-dom": "@hot-loader/react-dom" },
    }
}