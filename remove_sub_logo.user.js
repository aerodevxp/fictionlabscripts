// ==UserScript==
// @name         FictionLab Remove Subscription Logo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the bot-mess-logo element from chat
// @author       aeroraphxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function removeLogo() {
        const logos = document.querySelectorAll('.bot-mess-logo');
        logos.forEach(logo => logo.remove());
    }

    removeLogo();

    const observer = new MutationObserver(() => {
        removeLogo();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
