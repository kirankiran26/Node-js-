let server=require("http");
let fs=require("fs");
let url=require("url");

let indexfile =fs.readFileSync('./index.html',"utf-8");
let datalist=JSON.parse(fs.readFileSync('./data.json',"utf-8"));
let itemlist=fs.readFileSync('./itemlist.html',"utf-8");


function replacingfun(templet,product){
    let output=templet.replace(/{{%id%}}/g,product.id);
    output=output.replace(/{{%productImage%}}/g,product.productImage);
    output=output.replace(/{{%price%}}/g,product.price);
    output=output.replace(/{{%modeName%}}/g,product.modeName);
    output=output.replace(/{{%id%}}/g,product.id);
    return output;
}
let s1=server.createServer((request,response)=>{
    let {query,pathname:path}=url.parse(request.url.toLowerCase());
    if(path==='/' || path==='/home') {
        response.end(indexfile.replace('{{%page%}}',"Home"))
    }
    else if (path==='/about') {
        response.end(indexfile.replace('{{%page%}}',"about"))
    }
    else if (path==='/product'){
       if(!query) {
        const modifieditem=datalist.map(item=>replacingfun(itemlist,item)).join('');
        let output=indexfile.replace('{{%page%}}',modifieditem);
        response.end(output);
       }
       else {
        let product=datalist[query.id];
        let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
        response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
       }
    }   
    else {
        response.end("404: ERROR    ");
    }
});

s1.listen(8000,"127.0.0.1",()=>{
    console.log("The Server has started...");
})