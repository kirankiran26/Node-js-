const server=require("http");
let fs=require("fs");
let url=require("url");
let indexfile=fs.readFileSync('./index.html',"utf-8");
let itemlist=fs.readFileSync('./items.html',"utf-8");
let datafile=JSON.parse(fs.readFileSync('./data.json',"utf-8"));

function replacingfun(templet,product){
    let output=templet.replace(/{{%strDrink%}}/g,product.strDrink);
    output=output.replace(/{{%strDrinkThumb%}}/g,product.strDrinkThumb);
    output=output.replace(/{{%idDrink%}}/g,product.idDrink);
    return output;
}
let s1=server.createServer((request,response)=>{
    let x=url.parse(request.url,true);
    console.log(x);
    let path=request.url.toLowerCase();
    if(path==='/' || path==='/home') {
        let output=indexfile;
        let modifieditem=datafile.drinks.map(item=>replacingfun(itemlist,item)).join('');
        output=output.replace('{{%ITEMS%}}',modifieditem);
        response.end(output);
    }
    else {
        response.end("ERROR")
    }
});

s1.listen(8000,"127.0.0.1",()=>{
    console.log("The server has started...... ");
});