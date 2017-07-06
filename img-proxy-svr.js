var http = require('http');
var URL = require('url');
var Request = require('request');

var port = 8000; // 端口
var method = '?imgUrl='; // 方法

let server = http.createServer((request, response) => {
    try {
        let requestUrlObj = URL.parse(request.url);
        if (requestUrlObj.pathname !== '/favicon.ico') {
            let targetUrl = requestUrlObj.search;
            if (!targetUrl || !targetUrl.startsWith(method)) {
                response.end();
                return;
            }
            targetUrl = targetUrl.substring(method.length);

            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            response.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
            response.setHeader('Access-Control-Max-Age', '86400');
            Request(targetUrl).pipe(response);
            console.debug('==> targetUrl: ' + targetUrl);

            // Request
            //     .get(targetUrl)
            //     .on('response', function (response) {
            //         console.log(response.statusCode) // 200 
            //         console.log(response.headers['content-type']) // 'image/png' 
            //         console.log(JSON.stringify(response));
            //     })
            //     // .pipe(request.put('http://mysite.com/img.png'))
            //     .pipe(response);
        }
    } catch (e) {
        console.error('request error' + e);
    }
});
server.listen(port);
console.error('==> svr is listen on: ' + port);