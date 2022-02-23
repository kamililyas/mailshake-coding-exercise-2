import * as characterService from './CharacterService';
import * as filmService from './FilmService';

/**
 *
 */
export async function initiate() {
  console.log('\x1b[36m%s\x1b[0m',
      'Fetching Star Wars characters');
  const characterFetchStatus = await characterService.fetchRequest();
  if (characterFetchStatus) {
    characterService.parseOutputs( (err: Error) => {
      if (err) {
        console.log(err);
      }

      // Success case
    });
  }

  console.log('\x1b[33m%s\x1b[0m', '\n' +
      'Fetching Star Wars films');
  const filmFetchStatus = await filmService.fetchRequest();
  if (filmFetchStatus) {
    filmService.parseOutputs(endProcessCallback);
  } else {
    console.log('Something went wrong.');
    endProcess();
  }
}

/**
 * @param {Error} err
 */
function endProcessCallback(err: Error) {
  if (err) {
    console.log(err);
  }

  // Success case
  console.log('\x1b[35m%s\x1b[0m', '\n' +
      'Process Completed ...  Yayyy!');
}

/**
 *
 */
function endProcess() {
  process.exit(1);
}
