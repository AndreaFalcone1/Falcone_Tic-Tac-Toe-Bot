import OpenAI from 'openai';

const generateAIComponent = function (token) {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: token
      });

    let questionFormat = `You will be shown a Tic-Tac-Toe board. Your ONLY response should be the row number (0-indexed) and column number (0-indexed) of an empty square where 'o' can be placed, in the EXACT format: "row","column". Do not include any other words or characters.
    Board:
    $BOARD
    `;

    return {
        ask: async function(board) {
            const completion = await openai.chat.completions.create({
                model: "openai/gpt-4-0314",
                messages: [
                  {
                    "role": "user",
                    "content": questionFormat.replace("$BOARD", board)
                  }
                ],    
            });
            if (completion.choices !== undefined) {
                console.log("ok")
                return completion.choices;
            } else {
                console.log("ko")
                let hold;
                while (true) {
                    hold = ((Math.floor(Math.random() * (2 - 0 + 1)) + 0) + "," + (Math.floor(Math.random() * (2 - 0 + 1)) + 0));
                    let isOk = hold.split(",");
                    console.log(hold);
                    if (board[isOk[0]][isOk[1]] === " ") {
                        break;
                    }
                }
                return hold;
            }
        }
    }
};



export default generateAIComponent;
