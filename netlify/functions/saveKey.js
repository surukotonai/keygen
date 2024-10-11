// netlify/functions/saveKey.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const PASTEBIN_API_KEY = process.env.PASTEBIN_API_KEY; // 環境変数から取得
    const key = event.queryStringParameters.key;

    const pasteData = new URLSearchParams({
        api_dev_key: PASTEBIN_API_KEY,
        api_option: 'paste',
        api_paste_code: `you key: ${key}`,
        api_paste_private: 1, // 0=public, 1=unlisted, 2=private
        api_paste_name: 'KeyGen Output',
        api_paste_expire_date: 'N' // Never expire
    });

    const response = await fetch('https://pastebin.com/api/api_post.php', {
        method: 'POST',
        body: pasteData
    });

    const result = await response.text();

    return {
        statusCode: 200,
        body: JSON.stringify({ result })
    };
};
