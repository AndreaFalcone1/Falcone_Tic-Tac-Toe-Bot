import { GoogleGenAI } from "@google/genai";

const generateAIComponent = async function () {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyCu2LAQBfwzk_5UnAgAG5M1JwTzDzAtSpI" });

    return {
        ask: async function (question) {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: question,
            });
            return response.text;
        }
    };
};

export default generateAIComponent;
