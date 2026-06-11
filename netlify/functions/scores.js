// netlify/functions/scores.js
// This function runs on Netlify's server — the API key never reaches the browser.

exports.handler = async function (event) {
  const API_KEY = process.env.SPORTSDB_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SPORTSDB_KEY environment variable is not set. Add it in Netlify → Site Settings → Environment Variables.' }),
    };
  }

  // Which endpoint to call — passed as a query param from the frontend
  // e.g. ?endpoint=livescore/soccer   or   ?endpoint=lookup_all_players&id=134497
  const params = event.queryStringParameters || {};
  const endpoint = params.endpoint || '';

  // Decide v1 vs v2 based on endpoint name
  let url;
  if (
    endpoint.startsWith('livescore') ||
    endpoint.startsWith('lookup/') ||
    endpoint.startsWith('search/')
  ) {
    // v2 endpoint — uses X-API-KEY header
    url = `https://www.thesportsdb.com/api/v2/json/${endpoint}`;
  } else {
    // v1 endpoint — key in URL path
    const qs = Object.entries(params)
      .filter(([k]) => k !== 'endpoint')
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/${endpoint}${qs ? '?' + qs : ''}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': API_KEY,
        'Accept': 'application/json',
      },
    });

    const text = await res.text();

    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: `Proxy fetch failed: ${err.message}` }),
    };
  }
};
