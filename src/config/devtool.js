import { isDevelopment } from "./env"

export const getDevTool = () => {
    return isDevelopment ? "cheap-module-eval-source-map" : "hidden-source-map";
}