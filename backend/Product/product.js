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
                
                console.log(req.body)
                // console.log(req.params.productID)
                const query = `
                        INSERT INTO [Product]
                        VALUES (
                            '${req.body.productID}',
                            N'${req.body.name}',
                            '${req.body.price}',
                            N'${req.body.info}',
                            '${req.body.image}',
                            '${req.body.category}',
                            '${req.body.sold}'
                        )
                    `;
                await new sql.Request().query(query);
                res.status(201).json({ success: true });
            } catch (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.put('/:productID', async (req, res) => {
            try {
                console.log(req.body)
                console.log(req.params.productID)
                const query = `
                        UPDATE [Product]
                        SET 
                            Name = N'${req.body.name}',
                            Price = '${req.body.price}',
                            Info = N'${req.body.info}',
                            Image = '${req.body.image}',
                            Category = '${req.body.category}',
                            Sold = '${req.body.sold}'
                        WHERE ProductID = '${req.params.productID}'
                    `;
                await new sql.Request().query(query);
                res.status(200).json({ success: true });
            } catch (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.delete('/:productID', async (req, res) => {
            try {
                console.log(req.params.productID)
                await new sql.Request().query(`
                    DELETE FROM [Product]
                    WHERE ProductID = '${req.params.productID}'
                `);
                res.status(201).json({ success: true });
            } catch (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.get('/', async (req, res) => {
            try {
                const viewQuery = `
                    SELECT * FROM Product
                    ${req.query.keyword ? ("WHERE Name LIKE N'%" + req.query.keyword + "%'") : ''}
                    ORDER BY ${req.query.sortField ? req.query.sortField : 'Sold'} ${req.query.sortDirection > 0 ? 'ASC' : 'DESC'}
                    OFFSET ${(req.query.pageNumber - 1) * req.query.pageSize} ROWS  
                    FETCH NEXT ${req.query.pageSize} ROWS ONLY
                    `
                const viewResult = await new sql.Request().query(viewQuery);
                const total = await new sql.Request().query(
                    `
                    SELECT COUNT(*) AS Total FROM Product
                    ${req.query.keyword ? ("WHERE Name LIKE '%" + req.query.keyword + "%'") : ''}
                    `
                );
                res.status(201).json({
                    success: true,
                    data: {
                        total: total.recordset[0].Total,
                        recordset: viewResult.recordset
                    }
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.get('/best-seller', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    SELECT TOP 8 * FROM Product
                    ${req.query.category ? ("WHERE Category LIKE 'N" + req.query.category + "'") : ''}
                    ORDER BY Sold DESC
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
        
        app.get('/:productID', async (req, res) => {
            try {
                const result = await new sql.Request().query(`
                    SELECT * FROM Product
                    WHERE ProductID = '${req.params.productID}'
                `);
                if (!result.rowsAffected[0]) {
                    res.json({
                        success: false,
                        message: "ProductID not exist"
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: result.recordset[0]
                    });
                }
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.get('/filter/price', async (req, res) => {
            try {
                const query = `
                    SELECT * FROM Product
                    WHERE Price BETWEEN ${req.query.from} AND ${req.query.to} 
                    AND Category LIKE N'${req.query.category}'
                    ORDER BY ${req.query.sortField ? req.query.sortField : 'Sold'} ${req.query.sortDirection > 0 ? 'ASC' : 'DESC'}
                    OFFSET ${(req.query.pageNumber - 1) * req.query.pageSize} ROWS  
                    FETCH NEXT ${req.query.pageSize} ROWS ONLY
                `;
                console.log(query);
                const result = await new sql.Request().query(query);
                const total = await new sql.Request().query(
                    `
                    SELECT COUNT(*) AS Total FROM Product
                    WHERE Price BETWEEN ${req.query.from} AND ${req.query.to}
                    AND Category LIKE N'${req.query.category}'
                    `
                );
                res.status(200).json({
                    success: true,
                    data: {
                        total: total.recordset[0].Total,
                        recordset: result.recordset
                    }
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        
        app.get('/filter/category', async (req, res) => {
            try {
                const query = `
                    SELECT * FROM [Product]
                    WHERE Category LIKE N'${req.query.category}'
                    ORDER BY ${req.query.sortField ? req.query.sortField : 'Sold'} ${req.query.sortDirection > 0 ? 'ASC' : 'DESC'}
                    OFFSET ${(req.query.pageNumber - 1) * req.query.pageSize} ROWS  
                    FETCH NEXT ${req.query.pageSize} ROWS ONLY
                `;
                const result = await new sql.Request().query(query);
                const total = await new sql.Request().query(
                    `
                    SELECT COUNT(*) AS Total FROM Product
                    WHERE Category LIKE N'${req.query.category}'
                    `
                );
                res.status(200).json({
                    success: true,
                    data: {
                        total: total.recordset[0].Total,
                        recordset: result.recordset
                    }
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.listen(process.env.PORT || 5005, (err) => {
            if (err) throw err;
            else console.log("Product service listen on port 5005...");
        });
    }
});