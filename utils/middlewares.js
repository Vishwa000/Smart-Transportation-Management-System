// utils/middlewares.js
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authService = require('../services/authService');

const setupMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const checkTokenExpiration = (req, res, next) => {
  // Check if the request has an Authorization header with a valid JWT
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded; // Store the decoded user information in the request

    // Check if the token is about to expire (e.g., within the next 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;
    const timeUntilExpiration = expirationTime - currentTime;

    if (timeUntilExpiration < 300) {
      // Token is about to expire, generate a new access token using the refresh token
      const newTokens = authService.refreshAccessToken(decoded);
      res.setHeader('Authorization', `Bearer ${newTokens.access_token}`);
    }

    next(); // Continue with the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = setupMiddlewares;
