'use strict';

const request = require('request');

const dayData = (tickerId, socket) => {
    const currencyPair = tickerId.split(':');
    const cryptoCurrency = currencyPair[0];
    const currency = currencyPair[1];

    const requestOptions = {
        url: `https://www.cryptocompare.com/api/data/histohour/?aggregate=1&e=CCCAGG&fsym=${cryptoCurrency}&limit=24&tsym=${currency}`,
        headers: {
            Origin: 'https://www.cryptocompare.com'
        }
    };

    request(requestOptions, (err, res, body) => {
        if (err) {
            return;
        }

        body = JSON.parse(body);

        socket.emit(`dayData:${tickerId}`, body);
    });
};

module.exports = {
    dayData
};