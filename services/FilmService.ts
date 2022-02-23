import {Film} from '../types/film';
import * as filmModel from '../models/film';

import {Constants} from '../config/constants';
import * as baseService from './BaseService';
import {getCharacterIdFromCharacterUrl,
  getFilmIdFromFilmUrl} from '../helpers/UrlHelper';
import * as CharacterFilmModel from '../models/character_film';
import * as CharacterModel from '../models/character';
const fs = require('fs');


export const parseOutputs = (callback: Function) => {
  const filenames = fs.readdirSync(Constants.responseOutputDir);

  // Traverse all files to parse the outputs from the API calls
  filenames.forEach((file: any) => {
    // Check for files with film level marking and process them only
    if (file.indexOf(Constants.responseOutputFilenameFilm)>=0) {
      const jsonArray = JSON.parse(
          fs.readFileSync(Constants.responseOutputDir + file,
              {encoding: 'utf8', flag: 'r'}),
      );

      // If results found try to insert them in the DB
      if (typeof jsonArray['results'] !==
          typeof undefined && jsonArray['results'] !== null) {
        const items = jsonArray['results'];

        // Traverse all results
        items.forEach((item: any) => {
          const id = getFilmIdFromFilmUrl(item['url']);
          const insertRelationalData = function(filmId: number, item: any) {
            if (typeof item['characters'] !== typeof undefined) {
              CharacterFilmModel.deleteByFilmId(filmId, (err: Error) => {
                if (err) {
                  // Failure case
                }

                item['characters'].forEach((characterUrl: any) => {
                  const characterId =
                      getCharacterIdFromCharacterUrl(characterUrl);

                  CharacterModel.findByExternalId(characterId,
                      (err: Error, character: any) => {
                        if (err) {
                          // Failure case
                        }

                        // If found insert relational data in DB
                        if (typeof character !== typeof undefined) {
                          CharacterFilmModel.create(character.id,
                              filmId, (err: Error, characterId: any) => {
                                if (err) {
                                  // Failure case
                                }

                                // Success case
                              });
                        }
                      });
                });
              });
            }
          };

          // Look for found item in DB
          filmModel.findByExternalId(id, (err: Error, film: any) => {
            if (err) {
              // Failure case
            }

            // If not found insert in DB
            if (typeof film === typeof undefined) {
              const newFilm: Film = {
                'id': 1000,
                'title': item['title'],
                'opening_crawl': item['opening_crawl'],
                'director': item['director'],
                'producer': item['producer'],
                'release_date': item['release_date'],
                'external_id': id,
                'external_url': item['url'],
              };

              filmModel.create(newFilm, (err: Error, insertId: any) => {
                if (err) {
                  // Failure case
                }

                // Insert relational data between films and characters
                insertRelationalData(parseInt(insertId), item);
              });
            } else {
              CharacterFilmModel.deleteByFilmId(parseInt(film.id),
                  (err: Error) => {
                    if (err) {
                      // Failure case
                    }

                    // Insert relational data between films and characters
                    insertRelationalData(parseInt(film.id), item);
                  });
            }
          });
        });
      }
    }
  });

  callback(null);
};

export const fetchRequest = async () => {
  const page = Constants.defaultPage;

  return await baseService.fetchRequest(Constants.filmsEndpoint + page,
      Constants.responseOutputFilenameFilm,
      filmModel.tableName);
};
