import {Constants} from '../config/constants';


export const getFilmIdFromFilmUrl = (url: string) => {
  let id = url.split(Constants.filmsEndpointUrlSplitter)[1];
  id = id.substring(0, id.length - 1);

  return parseInt(id);
};

export const getCharacterIdFromCharacterUrl = (url: string) => {
  let id = url.split(Constants.charactersEndpointUrlSplitter)[1];
  id = id.substring(0, id.length - 1);

  return parseInt(id);
};
