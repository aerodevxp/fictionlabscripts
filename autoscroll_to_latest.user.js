// ==UserScript==
// @name         FictionLab Auto Scroll to Bottom
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Scrolls to bottom when new chat messages appear
// @author       aeroraphxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const chatContainer = document.querySelector('.chat-container-content');
    let lastCount = document.querySelectorAll('.box-chat').length;

    if (!chatContainer) {
        console.error('FictionLab Auto Scroll: Could not find chat container');
        return;
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    setTimeout(() => {
        lastCount = document.querySelectorAll('.box-chat').length;
        console.log('FictionLab Auto Scroll: Initialized with', lastCount, 'messages');

        const observer = new MutationObserver((mutations) => {
            const currentCount = document.querySelectorAll('.box-chat').length;

            if (currentCount > lastCount) {
                console.log('FictionLab Auto Scroll: New message detected, scrolling to bottom');
                scrollToBottom();
                lastCount = currentCount;
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log('FictionLab Auto Scroll: Observer started');
    }, 1000);
})();
