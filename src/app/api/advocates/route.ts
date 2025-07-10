import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  let query = db
    .select()
    .from(advocates)
    .orderBy(desc(advocates.created_at));

    if (search) {
      query = query.where(
        or(
          ilike(advocates.first_name, `%${search}`),
          ilike(advocates.last_name, `%${search}`),
          ilike(advocates.city, `%${search}`)
        )
      )
    }

  const data = await db.select().from(advocates);

  return Response.json({ data });
}
