const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        var from = 'User';
        var text = 'Test message content'
        var message = generateMessage(from, text);

        expect(message).toMatchObject({ from, text });
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct geolocation message object', () => {

        var from = 'User';
        var latitude = 20;
        var longitude = -15;
        var url = 'https://www.google.com/maps?q=20,-15';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(typeof message.createdAt).toBe('number');
        expect(message.url).toBe(url);
    });
});