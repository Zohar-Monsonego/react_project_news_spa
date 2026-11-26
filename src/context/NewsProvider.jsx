// Step 3: NewsProvider - keeps the news and gives them to the whole app through NewsContext.
// It is already used in main.jsx: <NewsProvider><App /></NewsProvider>

import useFetch from "../hooks/useFetch";
import { NEWS_URL } from "../config.js";
import { useState } from "react";
import { NewsContext } from "./NewsContext";

/**
 * Gives through the context: { stories, loading, addStory }
 *   stories  - the stories you created + the articles from the API (data.articles), the new ones first
 *   loading  - true while the API has not answered yet
 *   addStory - (story) => adds a new story to the top of stories (it is not sent to the API)
 */
export default function NewsProvider({ children }) {
  const { data, loading } = useFetch(NEWS_URL);

  const [manual_stories, setManualStories] = useState([]);

  const stories = [...manual_stories, ...(data?.articles ?? [])];

  function addStory(story) {
    setManualStories((prev) => [story, ...prev]);
  }
  return (
    <NewsContext.Provider value={{ stories, loading, addStory }}>
      {children}
    </NewsContext.Provider>
  );
}
