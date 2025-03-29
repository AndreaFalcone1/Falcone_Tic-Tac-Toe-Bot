//
// Imports
//

import TelegramBot from 'node-telegram-bot-api';
import generateAIComponent from "./aiComponent/aiComponent.js";
import generateGameComponent from "./gameComponent/gameComponent.js";

//
// Dichiarazione Componenti / Variabili
//

const aiComponent = generateAIComponent();
const gameComponent = generateGameComponent();

const token = "8013547379:AAHBpVT59TfDAHbT5oDW6IqxIa1qmNAsqgc"
const bot = new TelegramBot(token, { polling: true, debug: true });

const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '1️⃣',
            callback_data: 'cell_1',
          },
          {
            text: '2️⃣',
            callback_data: 'cell_2',
          },
          {
            text: '3️⃣',
            callback_data: 'cell_3',
          },
          {
            text: '4️⃣',
            callback_data: 'cell_4',
          },
          {
            text: '5️⃣',
            callback_data: 'cell_5',
          },
          {
            text: '6️⃣',
            callback_data: 'cell_6',
          },
          {
            text: '7️⃣',
            callback_data: 'cell_7',
          },
          {
            text: '8️⃣',
            callback_data: 'cell_8',
          },
          {
            text: '9️⃣',
            callback_data: 'cell_9',
          },
        ]
      ]
    }
};

let result;

//
// Logica di Gioco
//

console.log("start");

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot! Would you like to play? Type "/game" to start it.');
    }

    if (messageText === '/game') {

        bot.sendMessage(chatId, "Game Start.");

        bot.sendMessage(chatId, "Here's the board, what's your move?\n\n" + gameComponent.returnBoard());
        
        /*
        while(result === undefined) {
            result = gameComponent.playRound(0,0);
        };
        */

        console.log("The winner is: " + result);

    }

});

