const { fetch } = require('cross-fetch');

/**
 * Запрашивает данные из тизера
 * Возвращает массив со всеми турнирами
 */
function fetchTeaserInfo() {
    return fetch('//www.sports.ru/core/stat/match/teaser/')
        .then(resp => resp.json())
        .then(({ teaser: { tournaments } }) => {
            return tournaments;
        });
}

/**
 * ПАриводит список турниров к виду нужному для построения кнопок
 */
function getTournamentsArray() {
    return fetchTeaserInfo()
        .then((resp) => {
            const tournamentsArray = resp.map((el) => {
                return [{ 
                    text: `${(el.sport && el.sport.name && el.sport.name.toUpperCase()) || ''}: ${el.name}`,
                    callback_data: el.tag_id,
                }];
            });
            return tournamentsArray;
        });
}

module.exports = getTournamentsArray;
