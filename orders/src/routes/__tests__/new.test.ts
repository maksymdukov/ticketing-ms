import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post(`/api/orders`)
    .set('Cookie', global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const cookie = global.signin();
  const newTicket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'Some title',
  });
  await newTicket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    ticket: newTicket,
    expiresAt: new Date(),
    userId: 'someuserId',
  });
  await order.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: newTicket.id })
    .expect(400);
});

it('it reserves a ticket', async () => {
  const cookie = global.signin();
  const newTicket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'Some title',
  });
  await newTicket.save();
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: newTicket.id })
    .expect(201);
});

it('emits an order created event', async () => {
  expect(natsWrapper.client.publish).not.toHaveBeenCalled();
  const cookie = global.signin();
  const newTicket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'Some title',
  });
  await newTicket.save();
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: newTicket.id })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
});
