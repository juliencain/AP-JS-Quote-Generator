'use client';

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import getQuote from '../api/Quote';

function Home() {
  const [, setQuote] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [quoteButtonText, setQuoteButtonText] = useState('Get a Quote');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuote();
        const newQuote = data.quotes[0];

        setQuote(newQuote);
        setQuoteText(newQuote.quote);
        setQuoteAuthor(newQuote.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuoteText('Failed to load quote');
      }
    };

    fetchQuote();
  }, []);

  const handleClick = () => {
    if (quoteButtonText === 'Get a Quote' || quoteButtonText === 'Get another Quote') {
      getQuote().then((data) => {
        const newQuote = data.quotes[0];
        setQuote(newQuote);
        setQuoteText(newQuote.quote);
        setQuoteAuthor(newQuote.author);
        setQuoteButtonText('See Who Said This');
      });
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
