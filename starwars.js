// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { play } from './music.js';
import { convert } from './roman.js';
import { restartAnimation } from './restart-animation.js';
import { friendlyFetch } from './friendly-fetch.js';

const API_ENDPOINT = 'https://swapi.dev/api'

play({
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}, document.body);

const filmsList = document.querySelector("#filmes ul");

const filmContent = document.querySelector('pre.introducao');

const handlerResponse = (response) => {
    filmsList.innerHTML = "";

    const orderedResponse = response.results.sort((a , b) => {
        if(a.episode_id < b.episode_id) return -1;
        if(a.episode_id > b.episode_id) return 1;
        return 0;
    });

    orderedResponse.forEach(film => {
        const { episode_id, title, opening_crawl } = film;

        const romanEp = convert(episode_id);

        const itemFilm = document.createElement('li');
        itemFilm.innerText = `Episode ${romanEp} - ${title}`;

        itemFilm.addEventListener('click', () => {
            filmContent.innerText = `Episode ${romanEp}\n${title.toUpperCase()}\n\n${opening_crawl}`;
            restartAnimation(filmContent);
        });

        filmsList.appendChild(itemFilm);
    });
};

friendlyFetch(`${API_ENDPOINT}/films`)
    .then(handlerResponse);
