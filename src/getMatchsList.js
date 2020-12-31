const { fetch } = require('cross-fetch');

/**
 * Перерабатывает данные о матчах в турнире 
 * и возвращает только нужные данные для отображения
 * @param {Array} matches - список всех матчей в данном турнире
 */
function makeMatchsArray(matches) {
    // Массив измененных данных о матче
    const serMatchArray = [];
    matches.forEach(match => {
        const buff = {};
        buff.score = match.score || '';
        buff.firstTeamName = (match.first_team && match.first_team.name) || '';
        buff.secondTeamName = (match.second_team && match.second_team.name) || '';
        buff.url = match.online_url;
        buff.status = match.status;
        buff.start_time = match.start_time;
        serMatchArray.push(buff);
    });
    return serMatchArray;
}

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
 * Запрашивает данные о матчах
 * Возвращает строку с результатами матчей
 */
function getMatchsResults(id) {
    return fetchTeaserInfo()
        .then((resp) => {
            let results;
            const tournament = resp.find(el => el.tag_id === +(id));
            const { name = 'Неизвестно', matches } = tournament;
            const serMatches = makeMatchsArray(matches);
            results = `<b>${name}</b>\n\n`;
            serMatches.forEach((match) => {
                if (match && match.status && match.status.name && match.status.id === 1) {
                    results += `${match.firstTeamName} : ${match.secondTeamName} <b>${match.start_time.bunin}</b>\n`;
                } else {
                    results += `${match.firstTeamName} <b>${match.score}</b> ${match.secondTeamName}\n`;
                    results += `${match.status.name.toUpperCase()}\n`;
                }

                results += `<i><a href="https://www.sports.ru${match.url}">Подробнее</a></i>\n\n`;
            });
            return results;
        });
}

module.exports = getMatchsResults;
