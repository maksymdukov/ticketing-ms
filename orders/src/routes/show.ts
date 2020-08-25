import { Router, Request, Response, NextFunction } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@mdtickets/common';
import { Order } from '../models/order';

const router = Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
