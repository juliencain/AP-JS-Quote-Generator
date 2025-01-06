'use client';

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import getQuote from '@/api/Quote';

function Home() {
  const [quote, setQuote] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [buttonText, setButtonText] = useState('Get a Quote');
  const [buttonColor, setButtonColor] = useState('red');

  useEffect(() => {
    const fetchInitialQuote = async () => {
      try {
        const data = await getQuote();
        setQuote(data);
        setQuoteText(data.quote);
        setButtonText('See Who Said This');
        setButtonColor('green');
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuoteText('Failed to load quote.');
        setButtonText('Try Again');
        setButtonColor('red');
      }
    };

    fetchInitialQuote();
  }, []);

  const handleClick = () => {
    if (buttonText === 'Get a Quote' || buttonText === 'Get Another Quote') {
      getQuote().then((data) => {
        setQuote(data);
        setQuoteText(data.quote);
        setButtonText('See Who Said This');
        setButtonColor('green');
      });
    } else if (buttonText === 'See Who Said This') {
      setQuoteText(`${quote.quote} — ${quote.author}`);
      setButtonText('another quote please');
      setButtonColor('yellow');
    }
  };

  const handleClear = () => {
    setQuoteText('');
    setButtonText('Get a Quote');
    setButtonColor('red');
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
      {/* This is where the quote text is displayed */}
      <div>{quoteText}</div>
      <Button style={{ backgroundColor: buttonColor, marginTop: '15px' }} onClick={handleClick}>
        {buttonText}
      </Button>
      <Button style={{ marginTop: '15px' }} onClick={handleClear}>
        clear
      </Button>
    </div>
  );
}

export default Home;
