import { Router } from 'express';
import { pool } from "../db";
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { Order } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import { User } from '../models/user.model';

const router = Router(); //router express
const queries = require('../queries');

//creazione di un nuovo ordine
router.post("/create", (req, res) => {
    const requestOrder = req.body;

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
        createdAt: new Date().toISOString()
    }

    pool.query(queries.createOrderQuery, [newOrder.orderItems, newOrder.totalPrice, newOrder.name, newOrder.address, newOrder.status, newOrder.userId, newOrder.createdAt], (error:any, results:any) => {
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
        }

        res.status(200).send(newOrder);
    });
});

//torna tutti gli ordini effettuati da un utente
router.get("/:userToken", (req, res) => {
    const token = req.params.userToken;
    pool.query(queries.getUserQuery, [token], (error:any, results:any) => {
        if(error) throw error;
        let user: User = results.rows[0];
        
        pool.query(queries.getUserOrdersQuery, [user.id], (error:any, results:any) => {
            if(error) throw error;
            let orders: Order[] = [];

            results.rows.forEach((orderDB: any) => {
                const newOrder: Order = {
                    id: orderDB["id"],
                    orderItems: orderDB["order_items"],
                    totalPrice: orderDB["total_price"],
                    name: orderDB["name"],
                    address: orderDB["address"],
                    status: orderDB["status"],
                    userId: orderDB["userId"],
                    createdAt: orderDB["created_at"],
                }

                orders.push(newOrder);
            })
            res.status(200).json(orders);
        });
    });
});

export default router;