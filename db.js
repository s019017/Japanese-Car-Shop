const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname,'shop.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT null,
    model TEXT NOT null,
    price REAL NOT null,
    startYear TEXT NOT null,
    endYear TEXT NOT null,
    hp INTEGER NOT null,
    torque INTEGER NOT null,
    topSpeed FLOAT NOT null,
    stock INTEGER NOT null DEFAULT 0
    )
`);

const {total} = db
    .prepare(`SELECT COUNT(*) AS total FROM products`)
    .get();

if (total === 0) {
    const insert = db.prepare(
        `INSERT INTO products (make,model,price,startYear,endYear,hp,torque,topSpeed,stock)` + 
        `VALUES (?,?,?,?,?,?,?,?,?)`
    );
    insert.run('Mazda','RX-7 FD',40000.00,1992,2002,265,294,155,0);
    insert.run('Nissan','Silvia S15',23000,1999,2002,250,274,150,0);
    insert.run('Nissan','180sx',23000,1989,1998,175,276,145,0);
    insert.run('Toyota','AE86 Trueno',15000,1983,1987,128,140,130,0);
    insert.run('Mitsubishi','3000GT',10000,1992,1995,282,407,155,0);
    insert.run('Subaru','Impreza WRX STI',25000,2002,2005,300,413,153,0);
    insert.run('Honda','Civic Type R EK9',20000,1997,2000,185,160,140,0);
    insert.run('Honda','NSX',100000,1990,2005,280,215,172,0);
    insert.run('Mazda','Miata NA',3000,1989,1994,130,135,121,0);
}



module.exports = db;