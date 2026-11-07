import { readFile } from 'fs/promises';
import { join } from 'path';
import { withDemoFab } from '../../lib/demoFab';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'demo-sukoon', 'index.html');
  const html = await readFile(filePath, 'utf-8');
  return new Response(withDemoFab(html), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
