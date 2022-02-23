import {Film} from './film';

export interface BasicCharacter {
    id: number,
}

export interface Character extends BasicCharacter {
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    external_id: number,
    external_url: string,
}

export interface CharacterFilm extends Character{
    films: Film,
}
// Relationship to be extended further when
// data fetch calls are implemented and
// relational data is lazy/eager loaded
