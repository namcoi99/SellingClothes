const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'WebCSDL',
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

        app.post('/', async (req, res) => {
            try {
                const checkResult = await new sql.Request().query(`
                    SELECT * FROM [Cart]
                    WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
                `);
                if (checkResult.rowsAffected[0]) {
                    const result = await new sql.Request().query(`
                        UPDATE [Cart]
                        SET Quantity = Quantity + ${req.body.quantity}
                        WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
                    `);
                    res.status(201).json({ success: true });
                } else {
                    const addQuery = `
                        INSERT INTO [Cart]
                        VALUES (
                            '${req.body.username}',
                            '${req.body.productID}',
                            '${req.body.quantity}'
                        )
                    `
                    // console.log(addQuery);
                    const result = await new sql.Request().query(addQuery);
                    res.status(201).json({ success: true });
                }
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.delete('/', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    DELETE FROM [Cart]
                    WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
                `);
                res.status(201).json({ success: true });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.put('/', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    UPDATE [Cart]
                    SET Quantity = ${req.body.quantity}
                    WHERE ProductID = '${req.body.productID}' AND Username = '${req.body.username}'
                `);
                res.status(201).json({ success: true });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.get('/:username', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    SELECT Cart.ProductID, Name, Image, Quantity, Price FROM [Cart]
                    INNER JOIN [Product] ON Cart.ProductID = Product.ProductID
                    WHERE Username = '${req.params.username}'
                `);
                res.status(201).json({
                    success: true,
                    data: result.recordset
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        
        });

        app.listen(process.env.PORT || 5001, (err) => {
            if (err) throw err;
            else console.log("Cart service listen on port 5001...");
        });
    }
});