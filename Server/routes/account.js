const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const __User__ = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET;
