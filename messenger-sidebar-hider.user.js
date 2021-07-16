// ==UserScript==
// @name         Messenger Sidebar hider
// @namespace    http://github.com/ivybrain
// @version      0.1
// @description  adds a button to hide the messenger navigation sidebar
// @author       Ivy Brain
// @match        https://www.messenger.com/*
// @icon         https://www.google.com/s2/favicons?domain=messenger.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //URL change detection from answer by aljgom on stackoverflow, https://stackoverflow.com/a/52809105/15715068
    history.pushState = ( f => function pushState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
        window.dispatchEvent(new Event('locationchange'))
    });

    function addButton() {

        if (document.getElementById("hideButton")) return;

        let top_bar = document.getElementsByClassName("rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 hv4rvrfc dati1w0a f10w8fjw pybr56ya b5q2rw42 lq239pai mysgfdmx hddg9phg")[0];
       
        let hide_button = document.createElement("button");

        hide_button.innerText = "Sidebar";
        hide_button.id = "hideButton";
        top_bar.prepend(hide_button);
        let hidden = 0;

        hide_button.onclick = () => {
            document.querySelector('[role="navigation"]').style.display = hidden ? "block" : "none";
            hidden = (hidden + 1) % 2;

        }
    };

    // give time for the whole page to load before adding button
    setTimeout(addButton, 2000);

    window.addEventListener('locationchange', function(){
        // Give time for a new message window to load before adding the button
        setTimeout(addButton, 300);
    })
})();