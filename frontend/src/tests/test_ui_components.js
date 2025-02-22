import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import ChatView from '../webui/components/chat/ChatView';
import CommentList from '../webui/components/comments/CommentList';
import SentimentChart from '../webui/components/visualization/SentimentChart';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('YouTube Insight Analyzer')).toBeInTheDocument();
  });

  test('navigates to Settings view', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('navigates to Analysis view', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Analysis'));
    expect(screen.getByText('Sentiment Analysis')).toBeInTheDocument();
  });
});

describe('ChatView Component', () => {
  test('renders ChatView component', () => {
    render(<ChatView isHidden={false} showAnnouncement={false} hideAnnouncement={() => {}} showHistoryView={() => {}} />);
    expect(screen.getByText('What can I do for you?')).toBeInTheDocument();
  });

  test('handles Save CSV button click', () => {
    render(<ChatView isHidden={false} showAnnouncement={false} hideAnnouncement={() => {}} showHistoryView={() => {}} />);
    fireEvent.click(screen.getByText('Save CSV'));
    expect(screen.getByText('Please enter a YouTube URL first.')).toBeInTheDocument();
  });

  test('handles Sentiment Analysis button click', () => {
    render(<ChatView isHidden={false} showAnnouncement={false} hideAnnouncement={() => {}} showHistoryView={() => {}} />);
    fireEvent.click(screen.getByText('Sentiment Analysis'));
    expect(screen.getByText('Please enter a YouTube URL first.')).toBeInTheDocument();
  });
});

describe('CommentList Component', () => {
  test('renders CommentList component', () => {
    render(<CommentList videoId="test_video_id" />);
    expect(screen.getByText('loading comments...')).toBeInTheDocument();
  });

  test('displays comments after fetching', async () => {
    const comments = [
      { text: 'Great video!', sentiment: { compound: 0.8, pos: 0.9, neg: 0.1, neu: 0.0 } },
      { text: 'Not bad.', sentiment: { compound: 0.2, pos: 0.3, neg: 0.1, neu: 0.6 } },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(comments),
      })
    );

    render(<CommentList videoId="test_video_id" />);
    expect(await screen.findByText('Great video!')).toBeInTheDocument();
    expect(await screen.findByText('Not bad.')).toBeInTheDocument();
  });
});

describe('SentimentChart Component', () => {
  test('renders SentimentChart component', () => {
    const data = [
      { timestamp: 1620000000000, sentiment: 0.5, commentCount: 10 },
      { timestamp: 1620003600000, sentiment: 0.7, commentCount: 15 },
    ];
    render(<SentimentChart data={data} />);
    expect(screen.getByText('Sentiment')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    render(<SentimentChart data={[]} loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
