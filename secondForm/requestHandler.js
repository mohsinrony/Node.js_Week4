'use strict';

const allowedFormats=[
    'application/x-www-form-urlencoded',
    'application/json'
];

const getRequestPostBodyData = request => 
new Promise((resolve,reject)=>{
    const type=request.headers['content-type'];
    if (allowedFormats.includes(type)){
        const databuffer=[];
        request.on('data', datapart=>databuffer.push(datapart));
        request.on('end', ()=>{
            const data=Buffer.concat(databuffer).toString();
            if(type==='application/json'){
                resolve(JSON.parse(data));
            }
            else {
                const params = new URLSearchParams(data);
                const jsonResult={};
                params.forEach((value,key)=>jsonResult[key]=value);
                resolve(jsonResult);
            }
        });
        request.on('error', () => reject('Error in transmission'));
    }
    else{
        reject('Wrong Content-Type');
    }
});

module.exports = {getRequestPostBodyData};
