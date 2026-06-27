// ==UserScript==
// @name         FictionLab Auto Scroll to New Messages
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-scrolls to new chat messages as they appear
// @author       aerodevxp
// @match        https://fictionlab.ai/chat/*
// @match        https://fictionlab.ai/chat
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let isInitialLoad = true;
    let knownMessages = new Set();

    // Mark all existing messages on page load
    function initKnownMessages() {
        const messages = document.querySelectorAll('.box-chat');
        messages.forEach(msg => {
            const id = msg.querySelector('[id^="bot-mess-"]') || msg.querySelector('[id^="message-"]');
            if (id) {
                knownMessages.add(id.id);
            }
        });
        isInitialLoad = false;
    }

    function scrollToMessage(boxChat) {
        const textBot = boxChat.querySelector('.text-bot') || boxChat.querySelector('.bot-mess');
        if (textBot) {
            textBot.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            boxChat.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function checkForNewMessages() {
        if (isInitialLoad) return;

        const messages = document.querySelectorAll('.box-chat');
        messages.forEach(msg => {
            const idElement = msg.querySelector('[id^="bot-mess-"]') || msg.querySelector('[id^="message-"]');
            if (idElement && !knownMessages.has(idElement.id)) {
                knownMessages.add(idElement.id);
                scrollToMessage(msg);
            }
        });
    }

    setTimeout(() => {
        initKnownMessages();

        const observer = new MutationObserver(() => {
            checkForNewMessages();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }, 1000);
})();
