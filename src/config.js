// Step 1: the address of the news API.

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=${API_KEY}`;
