const services = require('../app/services/index');

describe('Anime Services', () => {
  test('GetHomeAnime returns array or throws', async () => {
    try {
      const data = await services.GetHomeAnime();
      expect(Array.isArray(data)).toBe(true);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('SearchAnime with valid query returns array or throws', async () => {
    try {
      const data = await services.SearchAnime('Naruto');
      expect(Array.isArray(data)).toBe(true);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('SearchAnime with empty query throws error', async () => {
    await expect(services.SearchAnime('')).rejects.toThrow('Search query is required');
  });

  test('GetCharacters with valid id returns array or throws', async () => {
    try {
      const data = await services.GetCharacters(1);
      expect(Array.isArray(data)).toBe(true);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('GetCharacters with invalid id throws error', async () => {
    await expect(services.GetCharacters('invalid')).rejects.toThrow('Valid anime ID is required');
  });
});
