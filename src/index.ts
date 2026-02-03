import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import type { UserInsert } from "./db/schema";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(DB_URL, { schema });

async function main() {
    await db.delete(users);
    const newUSer: UserInsert = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
    }
    await db.insert(users).values(newUSer);

    const usersAfterInsert = await db.select().from(users);
    console.table(usersAfterInsert);

    await db.update(users).set({ age: 31 }).where(eq(users.email, newUSer.email));

    const usersAfterUpdate = await db.query.users.findFirst({
        where: eq(users.email, newUSer.email),
    });
    console.table(usersAfterUpdate);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})