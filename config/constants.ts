/**
 *
 */
export class Constants {
  static readonly responseOutputDir = 'output/';
  static readonly responseOutputExtension = '.json';
  static readonly responseOutputFilenameCharacter = 'characters-';
  static readonly responseOutputFilenameFilm = 'films-';
  // static readonly characterEndpoint = "https://swapi.dev/api/people/?page=";
  // static readonly filmsEndpoint = "https://swapi.dev/api/films/?page=";
  static readonly characterEndpoint = 'https://swapi.py4e.com/api/people/?page='; // URL of alternate API as other one goes down often
  static readonly filmsEndpoint = 'https://swapi.py4e.com/api/films/?page=';
  static readonly charactersEndpointUrlSplitter = 'api/people/';
  static readonly filmsEndpointUrlSplitter = 'api/films/';

  static readonly paginationBatchInProgress = 'in_progress';
  static readonly paginationBatchCompleted = 'completed';
  static readonly paginationBatchFailed = 'failed';

  static readonly defaultPage = 1;
}
