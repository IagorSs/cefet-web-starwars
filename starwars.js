// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { play } from './music.js';
import { convert } from './roman.js';

const API_ENDPOINT = 'https://swapi.dev/api'

play({
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}, document.body);

const filmsList = document.querySelector("#filmes ul");

const handlerResponse = (response) => {
    filmsList.innerHTML = "";

    const orderedResponse = response.results.sort((a , b) => {
        if(a.episode_id < b.episode_id) return -1;
        if(a.episode_id > b.episode_id) return 1;
        return 0;
    });

    orderedResponse.forEach(film => {
        const { episode_id, title } = film;

        const itemFilm = document.createElement('li');
        itemFilm.innerText = `Episode ${convert(episode_id)} - ${title}`

        filmsList.appendChild(itemFilm);
    });
};

fetch(`${API_ENDPOINT}/films`)
    .then(res => res.json())
    .then(handlerResponse);
