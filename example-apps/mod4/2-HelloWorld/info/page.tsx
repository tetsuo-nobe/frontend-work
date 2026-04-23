import Link  from "next/link"

const Info = () => {
  return (
    <div className="container">
      <h1>Info ページ</h1>
      <h2>このページは Next.js で作成しました</h2>
      <Link className="anchor" href="/">Top ページへ</Link>
    </div>
  )
}
export default Info
  