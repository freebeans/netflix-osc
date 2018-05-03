// ==UserScript==
// @name         Netflix OSC Client
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.netflix.com/watch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var i = setInterval(()=>{
        var v = document.getElementsByTagName('video')[0];
        if(v){
            clearInterval(i);
            console.log("Player encontrado! Inserindo JS.");
            insert(v);
        }else{
            console.log("Player não encontrado. Tentando novamente.");
        }
    }, 5000);

    function insert (vp){
        var ws = new WebSocket('ws://localhost:8080', 'netflix-osc-protocol');
        ws.onmessage = (event) => {
            var action = JSON.parse(event.data).action;
            if(action == 'play'){
                vp.play();
            }
            if(action == 'pause'){
                vp.pause();
            }
        };
    };
    // Your code here...
})();
