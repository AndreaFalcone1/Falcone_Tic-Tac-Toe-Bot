//
// Imports
//

import "dotenv/config.js";
import TelegramBot from 'node-telegram-bot-api';
import generateAIComponent from "./aiComponent/aiComponent.js";
import generateGameComponent from "./gameComponent/gameComponent.js";

//
// Dichiarazione Componenti / Variabili
//

const aiComponent = generateAIComponent(process.env.AI_TOKEN);
const gameComponent = generateGameComponent();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true, debug: true });

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '1️⃣', callback_data: '0,0' },
        { text: '2️⃣', callback_data: '0,1' },
        { text: '3️⃣', callback_data: '0,2' },
      ],
      [
        { text: '4️⃣', callback_data: '1,0' },
        { text: '5️⃣', callback_data: '1,1' },
        { text: '6️⃣', callback_data: '1,2' },
      ],
      [
        { text: '7️⃣', callback_data: '2,0' },
        { text: '8️⃣', callback_data: '2,1' },
        { text: '9️⃣', callback_data: '2,2' },
      ],
    ],
  },
};

let result;

//
// Logica di Gioco
//

console.log("start");

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot! Would you like to play? Type "/game" to start it.');
    }

    if (messageText === '/game') {
      const board = gameComponent.getBoard();
      bot.sendMessage(chatId, `Here's the board, what's your move?\n\n${board}`, inlineKeyboard);
    }

    if (messageText === '/restart') {
      gameComponent.reset();
      const board = gameComponent.getBoard();
      bot.sendMessage(chatId, `Here's the board, what's your move?\n\n${board}`, inlineKeyboard);
    }

});

bot.on('callback_query', async (callbackQuery) => {
  
  let slotSelected = callbackQuery.data.split(","); 
  let result = gameComponent.playRound(slotSelected[0], slotSelected[1]);
  let board = gameComponent.getBoard();


  inlineKeyboard.chat_id = callbackQuery.message.chat.id;
  inlineKeyboard.message_id = callbackQuery.message.message_id;

  if (result === "x") {
    board = gameComponent.getBoard();
    gameComponent.reset();
    bot.editMessageText(`Congratulations, you won! Type '/game' to do another round.\n\n${board}`, {chat_id : callbackQuery.message.chat.id, message_id : callbackQuery.message.message_id })

  } else if (result === 1) {
    
    let newBoard = gameComponent.getArrayBoard();
    let AImove = await aiComponent.ask(newBoard);
    let AIslotSelected = AImove.split(",");
    let AIresult = gameComponent.playRound(AIslotSelected[0], AIslotSelected[1]);
    newBoard = gameComponent.getBoard();

    if (AIresult === "o") {
      gameComponent.reset();
      bot.editMessageText(`You Lost! Type '/game' to do another round. \n\n${newBoard}`, {chat_id : callbackQuery.message.chat.id, message_id : callbackQuery.message.message_id });
    } else {
      bot.editMessageText(`Here's the board, what's your move?\n\n${newBoard}`, inlineKeyboard);
    }

  } else if (result === -1) {
    board = gameComponent.getBoard();
    bot.editMessageText(`That space is occupied! Select a different square.\n\n${board}`, inlineKeyboard)
    
  } else if (result === 0) {
    board = gameComponent.getBoard();
    gameComponent.reset();
    bot.editMessageText(`It's a Tie! Type '/game' to do another round. \n\n${board}`, {chat_id : callbackQuery.message.chat.id, message_id : callbackQuery.message.message_id });

  }
  
});
