let server = require("http");

let s1 = server.createServer((request, response) => {
    let path = request.url;
    
    if (path === "/" || path.toLowerCase() === "/home") {
        response.end("You are in the home page");
    } else if (path.toLowerCase() === '/about') {
        response.end("You are in the about page");
    } else if (path.toLowerCase() === '/contact') {
        response.end("You are in the contact page");
    } 
    else {
        response.writeHead(404, {
            'Content-Type': 'text/plain',
            'message':'Hii',
        });
        response.end("404 error: page not found");
    }
});

s1.listen(8000, "127.0.0.1", () => {
    console.log("Server has started");
});
