'use strict';

const fs = require('fs');

const path = require('path');

const MIMETYPES = {
    ".html":{ "type":"text/html", "encoding":"utf8"},
    ".js": { "type":"text/javascript", "encoding":"utf8"},
    ".css": { "type":"text/css", "encoding":"utf8"},
    ".json" : {"type":"application/json", "encoding":"utf8"},
    ".png" : {"type":"image/png", "encoding":"binary"},
    ".jpeg" : {"type":"image/jpeg", "encoding":"binary"},
    ".jpg" : {"type":"image/jpeg", "encoding":"binary"},
    ".gif" : {"type":"image/gif", "encoding":"binary"},
    ".ico": {"type":"image/vdn.microsoft.icon", "encoding":"binary"}
}

const read = filepath => {
    const extension = path.extname(filepath).toLowerCase();
    const mime = MIMETYPES[extension] ||
    {type:'application/octet-stream', encoding:'binary'};
    return fs.promises.readFile(filepath, mime.encoding)
    .then(fileData=>({fileData, mime}))
    .catch(err=>err);
}
const send = (res,resource){
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'Content-Length': Buffer.byteLength(resource.fileData, resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding);
}

const sendJson = (res, jsonResource) => {
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(jsonData);
}

const sendError = (res, message, type, code=404) => {
    res.writeHead(code, {'Content-Type':'application/json'});
    res.end(JSON.stringify({message, type}));
}

const isIn = (route, ...routes) => {
    for(let start of routes) {

    }
}

module.exports={read, send, sendJson, sendError};

