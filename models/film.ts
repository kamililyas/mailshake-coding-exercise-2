import {Film} from '../types/film';
import {db} from '../db';
import {RowDataPacket} from 'mysql2';
import ResultSetHeader from
  'mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader';

export const tableName = 'films';

export const create = (film: Film, callback: Function) => {
  const queryString = 'INSERT INTO films (title, opening_crawl, director,' +
      'producer, release_date, external_id, external_url)' +
      'VALUES (?, ?, ?,?, ?, ?, ?)';

  db.query(
      queryString,
      [film.title, film.opening_crawl, film.director, film.producer,
        film.release_date, film.external_id, film.external_url],
      (err, result: ResultSetHeader) => {
        if (err) {
          callback(err); console.log(err);
        }

        const insertId = result.insertId;
        callback(null, insertId);
      },
  );
};

export const findByExternalId = (externalId: number, callback: Function) => {
  const queryString = 'SELECT * FROM films WHERE external_id = ?';

  db.query(queryString, externalId, (err, result) => {
    if (err) {
      console.log(err); callback(err);
    }

    const row = (<RowDataPacket> result)[0];
    callback(null, row);
  });
};
