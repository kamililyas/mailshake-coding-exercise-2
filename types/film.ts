import {Character} from './character';

export interface BasicFilm {
    id: number,
}

export interface Film extends BasicFilm {
    title: string,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    external_id: number,
    external_url: string,
}

export interface FilmCharacters extends Character{
    characters: Character,
}
// Relationship to be extended further when
// data fetch calls are implemented and
// relational data is lazy/eager loaded
