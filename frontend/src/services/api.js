import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  async getVideoMetadata(videoId) {
    try {
      const response = await axios.get(`${BASE_URL}/video-metadata/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching video metadata:", error);
      throw error;
    }
  },

  async getVideoAnalysis(videoId) { // Renamed function to getVideoAnalysis
    try {
      const response = await axios.get(`${BASE_URL}/analyze/${videoId}`); // Use /analyze endpoint
      return response.data; // Return the complete response
    } catch (error) {
      console.error("Error fetching video analysis:", error);
      throw error; // Re-throw the error so components can handle it as well
    }
  },

  async getSentimentAnalysisForChart(videoId) {
    try {
      const response = await axios.get(`${BASE_URL}/sentiment-analysis?urlOrVideoId=${videoId}`);
      const data = response.data;
      // Transform the data into the format expected by the SentimentChart component
      const transformedData = Object.entries(data).map(([comment, analysis]) => ({
        comment: comment,
        sentiment: analysis.combined_score,
      }));
      return transformedData;
    } catch (error) {
      console.error("Error fetching sentiment analysis for chart:", error);
      throw error;
    }
  },

  async getSentimentTrends(comments) {
    try {
      const response = await axios.post(`${BASE_URL}/sentiment/trends`, { comments });
      return response.data;
    } catch (error) {
      console.error("Error fetching sentiment trends:", error);
      throw error;
    }
  },

  async getWordcloud(comments) {
    try {
      const response = await axios.post(`${BASE_URL}/wordcloud`, { comments });
      return response.data;
    } catch (error) {
      console.error("Error fetching wordcloud:", error);
      throw error;
    }
  },

  async getEngagementMetrics(videoId) {
    try {
      const response = await axios.get(`${BASE_URL}/engagement?urlOrVideoId=${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching engagement metrics:", error);
      throw error;
    }
  },

  async getProviders() {
    try {
      const response = await axios.get(`${BASE_URL}/providers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching providers:", error);
      throw error;
    }
  },

  async saveSettings(settings) {
    try {
      const response = await axios.post(`${BASE_URL}/settings`, settings);
      return response.data;
    } catch (error) {
      console.error("Error saving settings:", error);
      throw error;
    }
  },

  async searchVideos(query) { // Function to call search API
    try {
      const response = await axios.get(`${BASE_URL}/search?q=${query}`);
      return response.data.results; // Return only the results array
    } catch (error) {
      console.error("Error searching videos:", error);
      throw error;
    }
  }
};

export default api;
