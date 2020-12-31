const getTournamentsArray = require('../getTournamentsList');

/**
 * Содержит список коллбэков в зависимости от выбора пользователя
 * коллбэк должен возвращаться промис
 */
module.exports = {
    'last-news': () => Promise.resolve('В разработке! Попробуй пока узнать результаты матчей.'),
    'tournaments-list': getTournamentsArray,
};
