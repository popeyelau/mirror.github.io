'use strict';var server;this.onmessage=function(b){var a=b.data;switch(a.type){case "init":return startServer(a.defs,a.plugins,a.scripts);case "add":return server.addFile(a.name,a.text);case "del":return server.delFile(a.name);case "req":return server.request(a.body,function(c,d){postMessage({id:a.id,body:d,err:c&&String(c)})});case "getFile":return b=pending[a.id],delete pending[a.id],b(a.err,a.text);default:throw Error("Unknown message type: "+a.type);}};var nextId=0,pending={};
function getFile(b,a){postMessage({type:"getFile",name:b,id:++nextId});pending[nextId]=a}function startServer(b,a,c){c&&importScripts.apply(null,c);server=new tern.Server({getFile:getFile,async:!0,defs:b,plugins:a})}this.console={log:function(b){postMessage({type:"debug",message:b})}};
