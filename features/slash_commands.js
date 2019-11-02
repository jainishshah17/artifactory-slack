/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const {SlackDialog} = require('botbuilder-adapter-slack');
var artCli = require('artifactory-client-node');
var art = new artCli.artifactory();

module.exports = function (controller) {

    controller.ready(async () => {
        if (process.env.MYTEAM) {
            let bot = await controller.spawn(process.env.MYTEAM);
            await bot.startConversationInChannel(process.env.MYCHAN, process.env.MYUSER);
            bot.say('I AM AWOKEN.');
        }
    });

    controller.on('slash_command', async (bot, message) => {
        if (message.text === 'plain') {
            await bot.reply(message, 'This is a plain reply');
        } else if (message.text === 'public') {
            await bot.replyPublic(message, 'This is a public reply');
        } else if (message.text === 'private') {
            await bot.replyPrivate(message, 'This is a private reply');
        } else if (message.text === 'help') {
            await bot.replyPrivate(message, 'Here to help');
        } else if (message.text === 'ping') {
            var ping = art.ping();
            ping.then(function (result) {
                bot.replyPrivate(message, result);
            }, function (err) {
                console.log(err);
            });
        } else if (message.text === 'system') {
            var system = art.system();
            system.then(function (result) {
                bot.replyPrivate(message, result);
            }, function (err) {
                console.log(err);
            });
        }



        // set http status
        // bot.httpBody({text:'You can send an immediate response using bot.httpBody()'});
        bot.httpStatus(200);

    });
};