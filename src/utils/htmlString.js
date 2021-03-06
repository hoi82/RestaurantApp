export const getHtmlString = (
    link,
    style,
    content,
    script
) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Restaurant App</title>            
            ${link}
            ${style}
        </head>
        <body style="margin: 0;padding: 0;">
            <noscript>스크립트가 동작하지 않습니다.</noscript>
            <div id="root" style="position : absolute; width: 100%; height: 100%; margin: 0;">${content}</div>
            ${script}            
        </body>
        </html>
    `;    
    
    return html;
};