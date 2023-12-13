import { Router } from 'express';
import { pool } from "../db";
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { Order } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';

const router = Router(); //router express
const queries = require('../queries');

//creazione di un nuovo ordine
router.post("/create", (req, res) => {
    const requestOrder = req.body;
    const {orderItems, totalPrice, name, address, userId} = req.body;

    //se non ci sono oggetti nell'ordine lo rifiuto
    if(requestOrder.orderItems.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send("Il carrello è vuoto");
        return;
    }

    const newOrder: Order = {
        id: '', //inizializzato dal database in automatico
        orderItems: requestOrder.orderItems,
        totalPrice: requestOrder.totalPrice,
        name: requestOrder.name,
        address: requestOrder.address,
        status: OrderStatus.NEW,
        userId: requestOrder.userId,
        createdAt: '',
        updatedAt: ''
    }
    //console.log(newOrder.order_items);
    
    pool.query(queries.createOrderQuery, [newOrder.orderItems, newOrder.totalPrice, newOrder.name, newOrder.address, newOrder.status, newOrder.userId], (error:any, results:any) => {
        if(error) throw error;
        res.status(201).send(newOrder);
    });
});

//torna il nuovo ordine effettuato
router.post("/newOrderForCurrentUser", (req, res) => {
    const currentUser = req.body;
    
    pool.query(queries.getNewOrderQuery, [currentUser["id"]], (error:any, results:any) => {
        if(error) throw error;
        
        const newOrder: Order = {
            id: results.rows[0]["id"],
            orderItems: results.rows[0]["order_items"],
            totalPrice: results.rows[0]["total_price"],
            name: results.rows[0]["name"],
            address: results.rows[0]["address"],
            status: results.rows[0]["status"],
            userId: results.rows[0]["userId"],
            createdAt: results.rows[0]["created_at"],
            updatedAt: results.rows[0]["updated_at"]
        }
        res.status(200).send(newOrder);
    });
});

export default router;