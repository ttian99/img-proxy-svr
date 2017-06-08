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
        }
    } catch (e) {
        console.log('request error' + e);
    }
});
server.listen(port);
console.log('==> svr is listen on: ' + port);