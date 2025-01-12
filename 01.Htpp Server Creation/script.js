const http = require("http");
const server = http.createServer((req,res) => {
    console.log('Server running on port 3000');
    if (req.url === "/") {
        res.end("home");
    }
    else if (req.url === '/about') {
        res.end("About");
    }
    else {
        res.end('Page Not Found');
    }
})



server.listen(3000, () => {
    console.log('Server running on port 3000');
});