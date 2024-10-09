import React, { useState } from 'react';

// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const UpvoteAllButton = () => {
  const [loading, setLoading] = useState(false);

  const scrollAndUpvote = async () => {
    setLoading(true);
    try {
      let keepScrolling = true;
      while (keepScrolling) {
        window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom
        await delay(2000); // Wait for 2 seconds to allow comments to load

        const upvoteButtons = document.querySelectorAll('[aria-label="upvote"]'); // Select all upvote buttons
        for (let btn of upvoteButtons) {
          if (!btn.getAttribute('aria-pressed')) {  // Skip if already upvoted
            btn.click();  // Upvote the comment
            await delay(Math.random() * 2000 + 1000);  // Delay between 1-3 seconds
          }
        }

        keepScrolling = document.body.scrollHeight > window.scrollY + window.innerHeight; // Continue scrolling if more comments are left
      }
    } catch (err) {
      console.error("Error in upvoting:", err);
    }
    setLoading(false);
  };

  return (
    <button
      style={{
        position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px',
        backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}
      onClick={scrollAndUpvote}
      disabled={loading}
    >
      {loading ? 'Upvoting...' : 'Upvote All'}
    </button>
  );
};

export default UpvoteAllButton;
