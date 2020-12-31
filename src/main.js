const { Telegraf } = require('telegraf');

// Список доступных команд
const Commands = require('./configs/commands');
// Коллбэки для кнопок меню
const Callbacks = require('./configs/callbacks');
const getMatchsResults = require('./getMatchsList');

// Создаем бота по нашему токену
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(
    'Привет!',
    { reply_markup: {
            inline_keyboard: Commands
        }
    },
));

bot.help((ctx) => ctx.reply('Введи любой текст или введи /start, чтобы увидеть меню!'));

bot.on('text', (ctx) => {
    ctx.reply(
        'Привет!',
        { reply_markup: {
                inline_keyboard: Commands
            }
        },
    );
});


/**
 * Следим за ответами пользователя пр инажатии на кнопки
 */
bot.on('callback_query', (ctx) => {
    const userChoise = ctx.callbackQuery && ctx.callbackQuery.data;
    let resp;

    console.log('Bot is working...');

    // Если пользователь выбрал результаты по турниру
    // то выводим информацию по матчам
    if (Object.keys(Callbacks).indexOf(userChoise) < 0) {
        ctx.reply('Секундочку...');
        resp = getMatchsResults(userChoise);
    } else {
        resp = Callbacks[userChoise]();
    }
    resp.then((data) => {
        if (userChoise === 'tournaments-list') {
            ctx.reply(
                'Выбери турнир:',
                { reply_markup: { inline_keyboard: data } },
            ); 
        } else {
            ctx.replyWithHTML(data);
        }
    });
});

bot.launch();
