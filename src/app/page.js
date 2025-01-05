'use client';

import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Home() {
  useEffect(() => {}, []);

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
      <Button> Get a Quote!</Button>
      abby and jules
    </div>
  );
}

export default Home;
