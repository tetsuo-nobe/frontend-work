import Link  from "next/link"

const Top = () => {
  return (
     <div className="container">
        <h1>Top ページ</h1>
        <h2>Hello World!</h2>
        <Link className="anchor" href="/info">Info ページへ</Link>
     </div>
  )
}
export default Top