import path from "path";

export const joinPath = (...args) => {
    return path.join(process.cwd(), ...args);
};