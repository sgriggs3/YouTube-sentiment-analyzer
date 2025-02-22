import React, { useEffect, useState, useCallback } from "react";
import { vscode } from "../../utils/vscode";
import { VSCodeProgressRing } from "@vscode/webview-ui-toolkit/react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface VideoMetadata {
  title: string;
  description: string;
  views: number;
  likes: number;
  publishedAt: string;
}

interface Comment {
  text: string;
  author: string;
  timestamp: string;
  sentiment: string;
}

interface AnalysisViewProps {
  videoId?: string;
  onDone?: () => void;
}

const useStyles = makeStyles({
  card: {
    margin: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
});

const AnalysisView: React.FC<AnalysisViewProps> = ({ videoId, onDone }) => {
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [analysisState, setAnalysisState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const classes = useStyles();

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
    setError(null);
  }, []);

  const fetchWithTimeout = async (url: string, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  const fetchMetadata = async () => {
    if (!videoId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/video-metadata/${videoId}`);
      if (!response.ok) throw new Error("Failed to fetch video metadata");
      const data = await response.json();
      setMetadata(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!videoId) return;
    setProgressMessage("Scraping comments...");
    try {
      const response = await fetch(`/api/comments?videoId=${videoId}&maxResults=500`);
      if (!response.ok) throw new Error("Failed to scrape comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error scraping comments:", error);
    }
  };

  const handleScrape = async () => {
    if (!videoId) return;
    setProgress(0);
    setProgressMessage("Scraping comments...");
    try {
      const response = await fetch(`/api/comments?videoId=${videoId}&maxResults=500`);
      if (!response.ok) {
        throw new Error(`Failed to scrape comments: ${response.status} ${response.statusText}`);
      }
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error("Error scraping comments:", error);
    }
  };

  const fetchData = async () => {
    if (!videoId || isFetchingData) return;
    setIsFetchingData(true);
    setError(null);
    try {
      await fetchMetadata();
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    if (videoId) {
      fetchData();
    }
  }, [videoId]);

  if (loading || isFetchingData) return <div>Loading...</div>;
  if (error) return <div>Error: { error } </div>;

  if (analysisState === "loading") {
    return (
      <div className= "loading-container" >
      <VSCodeProgressRing />
      < span > Analyzing video content...</span>
        </div>
    );
  }

if (!videoId || !comments) {
  return <div>No video ID or comments available </div>;
}

if (comments.length === 0 && metadata === null) {
  return <div>No comments available.Please scrape some comments.</div>;
}

return (
  <div className= "analysis-container" >
  <button onClick={ handleRefresh }> Refresh </button>
    < h2 > { metadata?.title } </h2>
    < div className = "metadata-grid" >
      <div className="metadata-item" >
        <label>Views: </label>
          < span > { metadata?.views.toLocaleString() } </span>
          </div>
          < div className = "metadata-item" >
            <label>Likes: </label>
              < span > { metadata?.likes.toLocaleString() } </span>
              </div>
              < div className = "metadata-item" >
                <label>Published: </label>
                  <span>
{
  metadata?.publishedAt
  ? new Date(metadata.publishedAt).toLocaleDateString()
  : ""
}
</span>
  </div>
  </div>
  < p className = "description" > { metadata?.description } </p>
    < h2 > Analysis </h2>
    < Grid container spacing = { 2} >
    {
      comments.map((comment, index) => (
        <Grid item xs = { 12} sm = { 6} md = { 4} key = { index } >
        <Card className={ classes.card } >
      <CardContent>
      <Typography variant="h6" > { comment.author } </Typography>
      < Typography variant = "body2" > { comment.text } </Typography>
      < Typography variant = "body2" > Sentiment: { comment.sentiment } </Typography>
      < Typography variant = "body2" >
      Timestamp: { new Date(comment.timestamp).toLocaleString() }
      </Typography>
      </CardContent>
      </Card>
      </Grid>
      ))
    }
      </Grid>
      </div>
  );
};

export default AnalysisView;
