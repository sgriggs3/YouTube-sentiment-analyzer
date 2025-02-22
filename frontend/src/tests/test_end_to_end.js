import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('End-to-End Testing', () => {
  test('fetches and displays video metadata and sentiment analysis', async () => {
    render(<App />);

    // Simulate user input
    const input = screen.getByPlaceholderText('Enter YouTube Video ID');
    fireEvent.change(input, { target: { value: 'test_video_id' } });

    // Simulate form submission
    const button = screen.getByText('Analyze');
    fireEvent.click(button);

    // Wait for metadata and sentiment analysis to be displayed
    await waitFor(() => {
      expect(screen.getByText('Video Metadata')).toBeInTheDocument();
      expect(screen.getByText('Sentiment Analysis')).toBeInTheDocument();
    });

    // Check if metadata and sentiment analysis are displayed correctly
    expect(screen.getByText('Video Metadata')).toBeInTheDocument();
    expect(screen.getByText('Sentiment Analysis')).toBeInTheDocument();
  });

  test('handles error when fetching video metadata and sentiment analysis', async () => {
    render(<App />);

    // Simulate user input
    const input = screen.getByPlaceholderText('Enter YouTube Video ID');
    fireEvent.change(input, { target: { value: 'invalid_video_id' } });

    // Simulate form submission
    const button = screen.getByText('Analyze');
    fireEvent.click(button);

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch metadata: 404')).toBeInTheDocument();
    });

    // Check if error message is displayed correctly
    expect(screen.getByText('Error: Failed to fetch metadata: 404')).toBeInTheDocument();
  });
});
