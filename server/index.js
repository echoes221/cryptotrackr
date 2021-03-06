'use strict';

const config = require('../config');
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');
const api = require('./api');
const Ticker = require('./ticker');

app.use(express.static(path.join(__dirname, '../view')));
app.use(express.static(path.join(__dirname, '../dist')));

io.on('connection', (socket) => {
    const ticker = new Ticker({ socket });

    socket.on('disconnect', () => {
        ticker.stop();
    });

    socket.emit('connected', {message: 'connected'});

    socket.on('schedule', (data) => {
        ticker.schedule({tickerId: data.tickerId});
    });

    socket.on('forget', (data) => {
        ticker.forget({tickerId: data.tickerId});
    });

    socket.on('hourData', (data) => {
        api.hourData(socket, data.tickerId);
    });

    socket.on('dayData', (data) => {
        api.dayData(socket, data.tickerId, data.days);
    });
});

server.listen(config.port, () => {
    console.log(`cryptotrackr server listening on ${config.port}`);
});
