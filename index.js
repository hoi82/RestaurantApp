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
//asset-require-hook은 해당하는 확장자를 노드에서 require(import)로 불러올때 data uri나 변환되거나 변환되지 않은 파일이름을 리턴하는 플러그인
//그래서 dev mode에서 직접 돌릴때 이미지 파일이나 폰트 파일 직접 읽어서 에러나는 것을 방지함
//옵션은 반드시 file-loader나 url-loader와 맞춰야함
require("asset-require-hook")({
    extensions: ["png", "jpg", "svg", "ttf"]
});
require("./src/server");