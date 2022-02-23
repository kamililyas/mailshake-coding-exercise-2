import {Pagination} from '../types/pagination';
import {db} from '../db';
import {RowDataPacket} from 'mysql2';

export const tableName = 'paginations';

export const create = (pagination: Pagination, callback: Function) => {
  const queryString = 'INSERT INTO paginations (page, page_size, ' +
      'total_records, initiatable_type, batch_status) ' +
      'VALUES (?, ?, ?, ?, ?)';

  db.query(
      queryString,
      [pagination.page, pagination.page_size, pagination.total_records,
        pagination.initiatable_type, pagination.batch_status],
      (err, result) => {
        if (err) {
          callback(err); console.log(err);
        }

        // const insertId = (<OkPacket> result).insertId;
        // callback(null, insertId);
      },
  );
};

export const updateBatchStatus =
    (pagination: Pagination, callback: Function) => {
      const queryString = `UPDATE paginations SET batch_status=?`;

      db.query(
          queryString,
          [pagination.batch_status],
          (err, result) => {
            if (err) {
              callback(err); console.log(err);
            }
            callback(null);
          },
      );
    };

export const updatePage = (pagination: Pagination, callback: Function) => {
  const queryString = `UPDATE paginations SET page=?`;

  db.query(
      queryString,
      [pagination.page],
      (err, result) => {
        if (err) {
          callback(err); console.log(err);
        }
        callback(null);
      },
  );
};

export const findByType =
    (initiatableType: string, status: string, callback: Function) => {
      const queryString = `
    SELECT 
      *
    FROM paginations
    WHERE initiatable_type = ? AND batch_status = ?`;

      db.query(queryString, [initiatableType, status], (err, result) => {
        if (err) {
          callback(err); console.log(err);
        }

        const row = (<RowDataPacket> result)[0];
        callback(null, row);
      });
    };
