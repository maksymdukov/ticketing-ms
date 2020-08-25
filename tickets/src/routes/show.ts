import { Router, Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError, BadRequestError } from '@mdtickets/common';

const router = Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).json(ticket);
});

export { router as showTicketRouter };
