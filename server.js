import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { post } from 'axios';

const app = express();
app.use(cookieParser());
app.use(cors());

const CLIENT_KEY = 'tu_client_key';
const CLIENT_SECRET = 'tu_client_secret';
const REDIRECT_URI = 'https://tu_dominio.com/auth/callback';

app.get('/oauth', (req, res) => {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie('csrfState', csrfState, { maxAge: 60000 });

  let url = 'https://www.tiktok.com/v2/auth/authorize/';
  url += `?client_key=${CLIENT_KEY}`;
  url += '&scope=user.info.basic,video.list';
  url += '&response_type=code';
  url += `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  url += `&state=${csrfState}`;

  res.redirect(url);
});

app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  const csrfState = req.cookies.csrfState;

  if (state !== csrfState) {
    return res.status(403).send('CSRF state mismatch');
  }

  try {
    const tokenResponse = await post('https://open-api.tiktok.com/oauth/access_token/', null, {
      params: {
        client_key: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });

    const accessToken = tokenResponse.data.data.access_token;
    res.cookie('accessToken', accessToken, { maxAge: 3600000 });
    res.redirect('/'); // Redirige al usuario a la página principal después de la autenticación
  } catch (error) {
    console.log('Error getting access token:', error.message);
    res.status(500).send('Authentication failed');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
