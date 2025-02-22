import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000'; // Flask backend runs on port 5000

export const fetchSentimentAnalysis = async (videoUrl) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments`, {
            params: { url: videoUrl }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sentiment analysis:", error);
        toast.error(error.message);
        throw error;
    }
};
