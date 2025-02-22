import React from 'react';

function VideoMetadata({ metadata }) {
  return (
    <div>
      <h2>Video Metadata</h2>
      <pre>{JSON.stringify(metadata, null, 2)}</pre>
    </div>
  );
}

export default VideoMetadata;