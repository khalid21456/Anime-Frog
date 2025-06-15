const express = require('express');
const router = express.Router();
const services = require('../services');

// Debug log to check what's being imported
console.log('Imported services:', Object.keys(services));

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express API 🚀' });
});

router.get('/LandingAnimes', async (req, res, next) => {
  try {
    const animes = await services.GetHomeAnime();
    if (!animes || animes.length === 0) {
      const error = new Error('No anime data found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Anime data retrieved successfully',
      count: animes.length,
      data: animes
    });
  } catch (error) {
    next(error);
  }
});

router.get('/SearchAnime', async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      const error = new Error('Search query is required');
      error.status = 400;
      throw error;
    }

    console.log('Received search request with query:', query);
    const animes = await services.SearchAnime(query);
    
    if (!animes || animes.length === 0) {
      const error = new Error('No anime found for your search query');
      error.status = 404;
      error.query = query;
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Anime data retrieved successfully', 
      query: query,
      count: animes.length,
      data: animes
    });
  } catch (error) {
    next(error);
  }
});

router.get('/details/:id/characters', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      const error = new Error('Valid anime ID is required');
      error.status = 400;
      throw error;
    }

    console.log('Fetching characters for anime ID:', id);
    const characters = await services.GetCharacters(id);
    
    if (!characters || characters.length === 0) {
      const error = new Error('No characters found for this anime');
      error.status = 404;
      error.animeId = id;
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Character data retrieved successfully', 
      animeId: id,
      count: characters.length,
      data: characters
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;