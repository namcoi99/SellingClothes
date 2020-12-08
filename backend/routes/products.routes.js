const express = require('express');
const sql = require('mssql');
const isAdministrator = require('../middleware/checkPermission');

const productRouter = express.Router();

productRouter.post('/', isAdministrator, async (req, res) => {
    try {
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
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

productRouter.put('/:productID', isAdministrator, async (req, res) => {
    try {
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
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// productRouter.delete('/:productID', isAdministrator, async (req, res) => {
productRouter.delete('/:productID', async (req, res) => {
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

productRouter.get('/', async (req, res) => {
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

productRouter.get('/best-seller', async (req, res) => {
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

productRouter.get('/:productID', async (req, res) => {
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

module.exports = productRouter;