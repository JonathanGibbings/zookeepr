const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Darlene', id: '123' },
        zookeepers
    );

    expect(zookeeper.name).toEqual('Darlene');
    expect(zookeeper.id).toEqual('123');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];
    const updateZookeepers = filterByQuery({ age: "31" }, startingZookeepers);

    expect(updateZookeepers.length).toEqual(1);
});

test('finds a zookeeper by id', () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];
    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Isabella');
});

test('validate age', () => {
    const zookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
    };

      const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",
    };
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});