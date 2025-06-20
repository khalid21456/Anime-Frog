const fetch = require('node-fetch');

/**
 * Fetches anime data from Jikan API
 * @returns {Promise<any>} - Processed anime data
 */
async function GetHomeAnime() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response status:', response.status);
    console.log('Number of items received:', data.data ? data.data.length : 0);
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('Unexpected API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    return data.data;
  } catch (error) {
    console.error('Error in GetHomeAnime:', error);
    throw new Error(`Failed to fetch anime data: ${error.message}`);
  }
}

/**
 * Search for anime using the Jikan API
 * @param {string} query - Search query
 * @returns {Promise<any>} - Search results
 */
async function SearchAnime(query) {
  if (!query) {
    throw new Error('Search query is required');
  }
  
  try {
    const searchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('Unexpected API response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid API response structure');
    }
    return data.data;
  } catch (error) {
    console.error('Error in SearchAnime:', error);
    throw error;
  }
}

/**
 * Get characters for a specific anime by ID
 * @param {string|number} animeId - The ID of the anime
 * @returns {Promise<any>} - Character data
 */
async function GetCharacters(animeId) {
  if (!animeId || isNaN(animeId)) {
    throw new Error('Valid anime ID is required');
  }
  
  try {
    console.log('Fetching characters for anime ID:', animeId);
    const searchUrl = `https://api.jikan.moe/v4/anime/${animeId}/characters`;
    console.log('Request URL:', searchUrl);
    
    const response = await fetch(searchUrl);    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Response data keys:', Object.keys(data));
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('Unexpected API response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid API response structure');
    }
    
    console.log(`Found ${data.data.length} characters`);
    return data.data;
  } catch (error) {
    console.error('Error in GetCharacters:', error);
    throw error;
  }
}

module.exports = {
    GetHomeAnime,
    SearchAnime,
    GetCharacters
};