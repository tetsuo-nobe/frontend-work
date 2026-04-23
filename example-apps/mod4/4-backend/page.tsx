"use client"
import Link  from "next/link"
import React, {useState} from "react"

const Top = () => {
  // 入力した名前と表示用のメッセージを State として管理  
  const [name, setName] = useState("")   
  const [message, setMessage] = useState("")

  // Submit ボタン選択時に実行する関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault()
    try {
      // API の呼出し      
      const response = await fetch("/api/hello", {        
        method: "POST",        
        headers: {          
          "Accept": "application/json",          
          "Content-Type": "application/json"        
         },        
         body: JSON.stringify({          
           yourname : name        
         })       
      })
      // API の実行結果の取得    
      const jsonData = await response.json()

      // 実行結果の表示
      setMessage(jsonData.message)
    } catch {          
      alert("handleSubmit Error")
    }  
  }
  return (
     <div className="container">
        <h1>Top ページ</h1>
        <form onSubmit={handleSubmit}>        
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="yourname" placeholder="お名前を入力" required />        
          <button>Greeting</button>      
        </form>    
        <h2>{message}</h2>
        <Link className="anchor" href="/info">Info ページへ</Link>
     </div>
  )
}
export default Top