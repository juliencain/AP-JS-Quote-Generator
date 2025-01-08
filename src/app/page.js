'use client';

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import getQuote from '../api/Quote';

function Home() {
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [quoteButtonText, setQuoteButtonText] = useState('Get a Quote');

  useEffect(() => {
    const fetchInitialQuote = async () => {
      try {
        const data = await getQuote();
        const initialQuote = data.quotes[0];
        setQuoteText(initialQuote.quote);
        setQuoteAuthor(initialQuote.author);
        setQuoteButtonText('See Who Said This');
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuoteText('Failed to load quote');
      }
    };

    fetchInitialQuote();
  }, []);

  const fetchNewQuote = async () => {
    try {
      const data = await getQuote();
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const newQuote = data.quotes[randomIndex];

      setQuoteText(newQuote.quote);
      setQuoteAuthor(newQuote.author);
      setQuoteButtonText('See Who Said This');
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuoteText('Failed to load quote');
    }
  };

  // Handle button click logic
  const handleClick = () => {
    if (quoteButtonText === 'Get a Quote' || quoteButtonText === 'Get another Quote') {
      fetchNewQuote(); // Fetch and display a new random quote
    } else if (quoteButtonText === 'See Who Said This') {
      setQuoteText(`${quoteText} — ${quoteAuthor}`);
      setQuoteButtonText('Get another Quote');
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Display the quote text */}
      <div>{quoteText}</div>

      {/* Button with dynamic text */}
      <Button style={{ marginTop: '15px' }} onClick={handleClick}>
        {quoteButtonText}
      </Button>
    </div>
  );
}

export default Home;
