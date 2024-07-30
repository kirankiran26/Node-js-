const http = require("http");
const fs = require("fs");

// Read the necessary files
const indexFile = fs.readFileSync('./indedx.html', "utf-8");
const data = JSON.parse(fs.readFileSync('./data.json', "utf-8"));
const itemList = fs.readFileSync('./items.html', "utf-8");




// Function to replace placeholders in the template with actual data
function replacingfun(template, product) {
    let output = template.replace(/{{%strDrink%}}/g, product.strDrink);
    output = output.replace(/{{%strDrinkThumb%}}/g, product.strDrinkThumb);
    output = output.replace(/{{%idDrink%}}/g, product.idDrink);
    return output;
}

// Create the server
const server = http.createServer((request, response) => {
    const path = request.url.toLowerCase();
    
    if (path === "/" || path === "/home") {
        let output = indexFile;
        const itemsHtml = data.drinks.map(drink => replacingfun(itemList, drink)).join('');
        output = output.replace('{{%ITEMS%}}', itemsHtml);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(output);
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end("<h1>404 - Page Not Found</h1>");
    }
});

// Listen on port 8000
server.listen(8000, "127.0.0.1", () => {
    console.log("The server is started on port 8000...");
});
