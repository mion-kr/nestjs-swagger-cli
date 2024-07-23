import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
// import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../common/database/drizzle/schema';

@Injectable()
export class UsersRepository {
  constructor(@Inject('default') private db: NodePgDatabase<typeof schema>) {}
  // constructor(
  //   @Inject('default') private db: PostgresJsDatabase<typeof schema>,
  // ) {}

  async create(user: schema.InsertUser) {
    return await this.db.insert(schema.user).values(user).returning();
  }

  async findOneById(id: string) {
    return await this.db.query.user.findFirst({
      where: and(eq(schema.user.id, id)),
    });
  }

  async findOneByEmail(email: string) {
    return await this.db.query.user.findFirst({
      where: and(eq(schema.user.email, email)),
    });
  }
}
