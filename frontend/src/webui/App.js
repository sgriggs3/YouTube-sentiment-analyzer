import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useEvent } from "react-use";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import ChatView from "./components/chat/ChatView";
import HistoryView from "./components/history/HistoryView";
import SettingsView from "./components/settings/SettingsView";
import WelcomeView from "./components/welcome/WelcomeView";
import { useExtensionState, ExtensionStateContextProvider } from "./context/ExtensionStateContext";
import { vscode } from "./utils/vscode";
import McpView from "./components/mcp/McpView";
import AnalysisView from "./components/analysis/AnalysisView";
import WebUI from "./components/WebUI";

const App = () => {
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      // Fetch video metadata from backend:
      const metaRes = await fetch(`/api/video-metadata/${videoId}`);
      if (!metaRes.ok) {
        throw new Error(`Failed to fetch metadata: ${metaRes.status} ${metaRes.statusText}`);
      }
      const metaData = await metaRes.json();
      setMetadata(metaData);

      // Fetch sentiment analysis from backend:
      const sentRes = await fetch(`/api/sentiment-analysis?urlOrVideoId=${videoId}`);
      if (!sentRes.ok) {
        throw new Error(`Failed to fetch sentiment analysis: ${sentRes.status} ${sentRes.statusText}`);
      }
      const sentData = await sentRes.json();
      setSentiment(sentData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setMetadata(null);
      setSentiment(null);
    }
  };

  const AppContent = () => {
    const { didHydrateState, showWelcome, shouldShowAnnouncement } = useExtensionState();
    const [showSettings, setShowSettings] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showMcp, setShowMcp] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(true);
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    const handleMessage = useCallback((e) => {
      const message = e.data;
      switch (message.type) {
        case "action":
          switch (message.action) {
            case "settingsButtonClicked":
              setShowSettings(true);
              setShowHistory(false);
              setShowMcp(false);
              break;
            case "historyButtonClicked":
              setShowSettings(false);
              setShowHistory(true);
              setShowMcp(false);
              break;
            case "mcpButtonClicked":
              setShowSettings(false);
              setShowHistory(false);
              setShowMcp(true);
              break;
            case "chatButtonClicked":
              setShowSettings(false);
              setShowHistory(false);
              setShowMcp(false);
              break;
          }
          break;
      }
    }, []);

    useEvent("message", handleMessage);

    useEffect(() => {
      if (shouldShowAnnouncement) {
        setShowAnnouncement(true);
        vscode.postMessage({ type: "didShowAnnouncement" });
      }
    }, [shouldShowAnnouncement]);

    useEffect(() => {
      const fetchVideoMetadata = async () => {
        try {
          const videoId = extractVideoIdFromURL(window.location.href);
          if (!videoId) {
            throw new Error("Invalid video ID");
          }
          console.log("Fetching video metadata for video ID:", videoId);
          const response = await fetch(`/api/video-metadata/${videoId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch video metadata: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          console.log("Video metadata fetched successfully:", data);
          setVideoMetadata(data);
        } catch (error) {
          console.error("Error fetching video metadata:", error);
        }
      };

      fetchVideoMetadata();
    }, []);

    if (!didHydrateState) {
      return null;
    }

    return (
      <>
        {showWelcome ? (
          <WelcomeView />
        ) : (
          <>
            {showSettings && <SettingsView onDone={() => setShowSettings(false)} />}
            {showHistory && <HistoryView onDone={() => setShowHistory(false)} />}
            {showMcp && <McpView onDone={() => setShowMcp(false)} />}
            {showAnalysis && <AnalysisView metadata={videoMetadata} onDone={() => setShowAnalysis(false)} />}
            <ChatView
              showHistoryView={() => {
                setShowSettings(false);
                setShowMcp(false);
                setShowAnalysis(false);
                setShowHistory(true);
              }}
              isHidden={showSettings || showHistory || showMcp || showAnalysis}
              showAnnouncement={showAnnouncement}
              hideAnnouncement={() => {
                setShowAnnouncement(false);
              }}
            />
          </>
        )}
      </>
    );
  };

  const extractVideoIdFromURL = (url) => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("video_id");
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;
    }
  };

  return (
    <ExtensionStateContextProvider>
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              YouTube Insight Analyzer
            </Typography>
            <Button color="inherit" component={Link} to="/settings">
              Settings
            </Button>
            <Button color="inherit" component={Link} to="/analysis">
              Analysis
            </Button>
          </Toolbar>
        </AppBar>
        <WebUI>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/analysis" element={<AnalysisView />} />
            {/* ...other routes... */}
          </Routes>
          <div>
            <h1>YouTube Sentiment Analysis</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder="Enter YouTube Video ID"
              />
              <button type="submit">Analyze</button>
            </form>
            {error && (
              <div style={{ color: 'red' }}>
                Error: {error}
              </div>
            )}
            {metadata && (
              <div>
                <h2>Video Metadata</h2>
                <pre>{JSON.stringify(metadata, null, 2)}</pre>
              </div>
            )}
            {sentiment && (
              <div>
                <h2>Sentiment Analysis</h2>
                <pre>{JSON.stringify(sentiment, null, 2)}</pre>
              </div>
            )}
          </div>
        </WebUI>
      </Router>
    </ExtensionStateContextProvider>
  );
};

export default App;