import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth } from '@mdtickets/common';
import { Order } from '../models/order';

const router = Router();

router.get(
  '/api/orders',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate(
      'ticket'
    );

    res.send(orders);
  }
);

export { router as indexOrderRouter };
