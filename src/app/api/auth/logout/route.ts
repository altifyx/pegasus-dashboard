import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('discord_access_token');
  cookieStore.delete('discord_user');

  return NextResponse.redirect(new URL('/', request.url));
}
