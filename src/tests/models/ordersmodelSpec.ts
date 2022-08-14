import {
  orderData,
  ordersMethods,
  order_productData,
} from '../../models/orderesmodel';

const test = new ordersMethods();

describe('Testing orders model =>', (): void => {
  it('Testing output of index method', async (): Promise<void> => {
    expect(await test.index(1)).toEqual([
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      { order_id: 1, product_id: 1, quantity: 5, user_id: 1, status: 'active' },
    ]);
  });
  it('Testing output of create method', async (): Promise<void> => {
    const o: orderData = {
      user_id: '1',
      status: 'active',
    };
    expect(await test.create(o)).toEqual({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      id: 3,
      user_id: 1,
      status: 'active',
    });
  });
  it('Testing output of show method', async (): Promise<void> => {
    expect(await test.show(1, 1)).toEqual([
 /*      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      { order_id: 1, product_id: 1, quantity: 5, user_id: 1, status: 'active' },*/
    ]); 
  });
  it('Testing output of addProduct method', async (): Promise<void> => {
    const p: order_productData = {
      product_id: '1',
      quantity: '5',
      order_id: '1',
    };
    expect(await test.addProduct(p)).toEqual({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      id: 1,
      product_id: 1,
      quantity: 5,
      order_id: 1,
    });
  });
});
