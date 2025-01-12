const fs = require('fs');
fs.mkdir('./newDirectory', (err) => {
    if (err) console.log(err);
    else console.log('Folder created');
})
const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('./newDirectory/readme.txt',data , (err) => {
    if(err) console.log(err);
    else console.log("file Created")
})
fs.readFile('./newDirectory/readme.txt','utf8',(err,data) => {
    if(err)console.log(err)
    else console.log(data);
})
fs.rm('./newDirectory/readme.txt',(err) => {
    if(err)console.log(err);
    else console.log('file deleted')
})
fs.rmdir('./newDirectory', (err) => {
    if(err)console.log(err);
    else console.log("deleted Folder");
})