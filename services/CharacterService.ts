import {Character} from '../types/character';
import * as characterModel from '../models/character';
import * as baseService from '../services/BaseService';

import {Constants} from '../config/constants';
const fs = require('fs');


export const parseOutputs = (callback: Function) => {
  const filenames = fs.readdirSync(Constants.responseOutputDir);

  // Traverse all files to parse the outputs from the API calls
  filenames.forEach((file: any) => {
    // Check for files with film level marking and process them only
    if (file.indexOf(Constants.responseOutputFilenameCharacter)>=0) {
      const jsonArray = JSON.parse(
          fs.readFileSync(Constants.responseOutputDir + file,
              {encoding: 'utf8', flag: 'r'}),
      );

      // If results found try to insert them in the DB
      if (typeof jsonArray['results'] !== typeof undefined &&
          jsonArray['results'] !== null) {
        const items = jsonArray['results'];

        // Traverse all results
        items.forEach((item: any) => {
          let id =
              item['url'].split(Constants.charactersEndpointUrlSplitter)[1];
          id = id.substring(0, id.length - 1);

          // Look for found item in DB
          characterModel.findByExternalId(id, (err: Error, character: any) => {
            if (err) {
              // Failure case
            }

            // If not found insert in DB
            if (typeof character === typeof undefined) {
              const newCharacter: Character = {
                'id': 1000,
                'name': item['name'],
                'height': ((item['height'] == 'unknown') ||
                    (item['height'] == 'none')) ? -1 : item['height'],
                'mass': (item['mass'] == 'unknown') ? -1 :
                    parseInt(item['mass'].replace(/,/g, '')),
                'hair_color': item['hair_color'],
                'skin_color': item['skin_color'],
                'eye_color': item['eye_color'],
                'birth_year': item['birth_year'],
                'gender': item['gender'],
                'external_id': id,
                'external_url': item['url'],
              };

              characterModel.create(newCharacter, (err: Error) => {
                if (err) {
                  // Failure case
                }

                // Success case
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

  return await baseService.fetchRequest(Constants.characterEndpoint + page,
      Constants.responseOutputFilenameCharacter,
      characterModel.tableName);
};
