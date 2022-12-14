import { Pool, RowDataPacket } from 'mysql2/promise';
import IOrder from '../Interfaces/Orders';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const QUERY = `
    SELECT 
      o.id, 
      o.userId, 
      JSON_ARRAYAGG(p.id) as productsIds
    FROM 
      Trybesmith.Orders AS o
    INNER JOIN 
      Trybesmith.Products AS p
    ON 
      o.id = p.orderId
    GROUP BY 
      o.id
    ORDER BY 
      o.userId;`;

    const [result] = await this.connection.execute<RowDataPacket[]>(QUERY);
    
    return result as IOrder[];
  }
}