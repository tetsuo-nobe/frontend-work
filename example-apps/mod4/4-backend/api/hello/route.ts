// POST メソッド時に実行する関数
export async function POST(request: Request) {
  const reqBody = await request.json()  
  const name = reqBody.yourname
  const msg = `こんにちは！ ${name} さん`  
  return Response.json({ message: msg })
}
