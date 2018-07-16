const expect = require('expect');

var { isRealString } = require('./validation');

describe('isRealString', () => {
    
    it('should reject non-string values', () => {
        var res = isRealString(2);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces',() => {
        var res = isRealString('       ');
        expect(res).toBe(false);
    })
    it('should allow strings with non-space characters', () => {
        var res = isRealString('  User   ');
        expect(res).toBe(true);
    });
});