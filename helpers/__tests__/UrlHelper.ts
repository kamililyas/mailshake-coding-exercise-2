import * as UrlHelper from '../UrlHelper';

describe('Extracting Character ID from a given' +
    ' external URL based on predefined pattern', () => {
  it('should resolve integer with valid url', async () => {
    const tester = UrlHelper.getCharacterIdFromCharacterUrl('https://swapi.py4e.com/api/people/1/');
    expect(typeof tester).toBe('number');
  });

  it('should resolve with false for url with non-integer value', async () => {
    const tester = UrlHelper.getCharacterIdFromCharacterUrl('https://swapi.py4e.com/api/people/omega313/');
    expect(isNaN(tester)).toBe(true);
  });

  it('should resolve with error for unrelated url', async () => {
    const tester = () => {
      UrlHelper.getCharacterIdFromCharacterUrl('https://google,com');
    };
    expect(tester).toThrow(TypeError);
  });
});

describe('Extracting Film ID from a given' +
    ' external URL based on predefined pattern', () => {
  it('should resolve integer with valid url', async () => {
    const tester = UrlHelper.getFilmIdFromFilmUrl('https://swapi.py4e.com/api/films/1/');
    expect(typeof tester).toBe('number');
  });

  it('should resolve with false for url with non-integer value', async () => {
    const tester = UrlHelper.getFilmIdFromFilmUrl('https://swapi.py4e.com/api/films/omega313/');
    expect(isNaN(tester)).toBe(true);
  });

  it('should resolve with error for unrelated url', async () => {
    const tester = () => {
      UrlHelper.getFilmIdFromFilmUrl('https://google,com');
    };
    expect(tester).toThrow(TypeError);
  });
});
