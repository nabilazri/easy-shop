import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Nabil Azri',
        email: 'nabil.az@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Brad Pitt',
        email: 'brad@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jim Carrey',
        email: 'jimmy@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Tom Hardy',
        email: 'hardy@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Leo Dicaprio',
        email: 'dicaprio@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'John doe',
        email: 'johny@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Joe dank',
        email: 'joe@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
