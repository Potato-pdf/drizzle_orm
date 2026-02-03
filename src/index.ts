import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { UserInsert } from "./db/schema"

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(DB_URL);

async function main() {
    const newUSer: UserInsert = {
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})