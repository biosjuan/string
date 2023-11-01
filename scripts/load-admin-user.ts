import { getClient } from "@/db";
import bcrypt from "bcrypt";
import { Client } from "pg";
import { faker } from "@faker-js/faker";
import { loadEnvConfig } from "@next/env";

async function loadAdminUser(username: string, password: string) {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
  //   console.log("user", username);
  //   console.log("pass", password);
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const client = await getClient();
  await client.connect();
  await client.query(
    "insert into public.users (username, password, is_admin) values ($1, $2, $3)",
    [username, hash, true]
  );
  await client.end();
}

const username = process.argv[2];
const password = process.argv[3];
loadAdminUser(username, password);
