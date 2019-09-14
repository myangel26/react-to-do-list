const uuidv4 = require('uuid/v4');

let items = [
    {
        id: uuidv4(),
        name: "ABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABC",
        level: 0
    },
    {
        id: uuidv4(),
        name: "DEF ABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABC",
        level: 1
    },
    {
        id: uuidv4(),
        name: "GHKABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABC",
        level: 2
    },
    {
        id: uuidv4(),
        name: "XYZABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABCABC ABC ABC",
        level: 1
    },
];

export default items;