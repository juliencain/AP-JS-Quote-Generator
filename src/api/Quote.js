const api = 'http://quotes.rest/quote/random.json?api_key=<34bLfTWYKqOsmmm8kgsJsl7SprnewYpq5VHmopp66bbaf771>';

const getQuote = () =>
  new Promise((resolve, reject) => {
    fetch(`${api}`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getQuote;
