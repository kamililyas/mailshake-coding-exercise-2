import {Character} from '../types/character';
import {db} from '../db';
import {RowDataPacket} from 'mysql2';

export const tableName = 'characters';

export const create = (character: Character, callback: Function) => {
  const queryString =
      'INSERT INTO characters (name, height, mass, hair_color, skin_color,' +
      ' eye_color, birth_year,gender, external_id, external_url) ' +
      ' VALUES (?, ?, ?,?, ?, ?,?, ?, ?, ?)';

  db.query(
      queryString,
      [character.name, character.height, character.mass,
        character.hair_color, character.skin_color, character.eye_color,
        character.birth_year, character.gender, character.external_id,
        character.external_url],
      (err, result) => {
        if (err) {
          callback(err); console.log(err);
        }

        // const insertId = (<OkPacket> result).insertId;
        // callback(null, insertId);
      },
  );
};

export const find = (characterId: number, callback: Function) => {
  const queryString = `
    SELECT 
      *
    FROM characters
    WHERE id = ?`;

  db.query(queryString, characterId, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket> result)[0];
    callback(null, row);
  });
};

export const findByExternalId = (externalId: number, callback: Function) => {
  const queryString = `
    SELECT 
      *
    FROM characters
    WHERE external_id = ?`;

  db.query(queryString, externalId, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket> result)[0];
    callback(null, row);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT 
    *
    FROM characters`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]> result;
    callback(null, rows);
  });
};
