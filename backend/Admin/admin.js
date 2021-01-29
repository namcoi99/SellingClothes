const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = {
    user: 'sa',
    password: 'Pass@word',
    server: 'db',
    database: 'WebCSDL'
};

sql.connect(config, (err, pool) => {
    if (err) console.log(err);
    else {
        console.log("SQL Server Connected...");

        const app = express();

        app.use(express.static('public'));
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false
        }));

        app.get('/count', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    SELECT COUNT(*) AS NumberOfProducts, SUM(Sold) AS Sold
                    FROM [Product]
                    SELECT COUNT(*) AS NumberOfCustomers
                    FROM [Customer]
                    SELECT COUNT(*) AS NumberOfOrders, SUM(Total) AS Total
                    FROM [Order]
                `);
                res.status(201).json({
                    success: true,
                    products: result.recordsets[0][0].NumberOfProducts,
                    sold: result.recordsets[0][0].Sold,
                    users: result.recordsets[1][0].NumberOfCustomers,
                    orders: result.recordsets[2][0].NumberOfOrders,
                    total: result.recordsets[2][0].Total
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.get('/recent-orders', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    SELECT TOP 5 * FROM [Order]
                    ORDER BY CreateDate DESC
                `);
                res.status(201).json({
                    success: true,
                    recordset: result.recordset
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.listen(process.env.PORT || 5000, (err) => {
            if (err) throw err;
            else console.log("Admin service listen on port 5000...");
        });
    }
});