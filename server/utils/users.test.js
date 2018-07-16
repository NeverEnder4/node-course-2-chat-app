const expect = require('expect');

const { Users } = require('./users');

beforeEach(() => {
    var users;
});

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Kat',
            room: 'The Office Enthusiasts'
        } , {
            id: '2',
            name: 'Tony',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'Andrew',
            room: 'The Office Enthusiasts'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id : '123',
            name: 'Tony',
            room: 'The Office Fans'
        };
        var res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for The Office Enthusiasts', () => {
        var userList = users.getUserList('The Office Enthusiasts');
        
        expect(userList).toEqual(['Kat', 'Andrew']);
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        
        expect(userList).toEqual(['Tony']);
    });

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });
    
    it('should remove user', () => {
        var userId = '3';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
});