import {db} from '../db';
import {RowDataPacket} from 'mysql2';

export const create =
    (characterId: number, filmId: number, callback: Function) => {
      const queryString =
      'INSERT INTO character_film (character_id, film_id) VALUES (?, ?)';

      db.query(
          queryString,
          [characterId, filmId],
          (err, result) => {
            if (err) {
              callback(err); console.log(err);
            }

            // const insertId = (<OkPacket> result).insertId;
            // callback(null, insertId);
          },
      );
    };

export const findByCharacterAndFilmIds =
    (characterId: number, filmId: number, callback: Function) => {
      const queryString = `
    SELECT 
      *
    FROM character_film
    WHERE character_id = ?
    AND film_id = ?`;

      db.query(queryString, [characterId, filmId], (err, result) => {
        if (err) {
          callback(err); console.log(err);
        }

        const row = (<RowDataPacket> result)[0];
        callback(null, row);
      });
    };

export const deleteByCharacterId =
    (characterId: number, callback: Function) => {
      const queryString = 'DELETE FROM character_film where character_id = ?';

      db.query(
          queryString,
          [characterId],
          (err, result) => {
            if (err) {
              callback(err); console.log(err);
            }

            callback(null);
          },
      );
    };

export const deleteByFilmId =
    (filmId: number, callback: Function) => {
      const queryString = 'DELETE FROM character_film where film_id = ?';

      db.query(
          queryString,
          [filmId],
          (err, result) => {
            if (err) {
              callback(err); console.log(err);
            }

            callback(null);
          },
      );
    };
