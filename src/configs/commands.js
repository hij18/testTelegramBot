/**
 * Содержит массив доступных команд для управления ботом
 */
module.exports = [
    [
      {
        text: 'Узнать результаты матчей',
        callback_data: 'tournaments-list',
      }
    ],
    [
        {
          text: 'Последние новости',
          callback_data: 'last-news'
        }
    ],
    [
        {
          text: 'Посетить сайт',
          url: 'https://sports.ru/',
        }
    ]
];
