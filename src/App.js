import { useState } from "react";
import { nanoid } from "nanoid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [animation] = useAutoAnimate()
  const ekle = e => {
    e.preventDefault();
    if(todo===""){
      setIsEmpty(true);
    }
    else{
      setTodos([{id: nanoid(), gorev: todo, durum: false}, ...todos]);
      setTodo("");
      setIsEmpty(false);
    }
    
  }
  const degistir = id => {
    setTodos(todos.map(item=>item.id===id?{...item, durum: !item.durum}:item))
  }
  const sil = id => {
    setTodos(todos.filter(t=>t.id!==id));
  }
  return (
    <div className="max-w-xl mx-auto py-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Yapılacaklar Listesi</h1>
      <form className="flex gap-x-4" onSubmit={ekle}>
        <input className="border rounded flex-1 indent-2 h-10" autoFocus type="text" placeholder="Bir görev yazın" onChange={e=>setTodo(e.target.value)} value={todo} />
        <button className="bg-teal-600 text-white px-3 h-10 rounded" type="submit">Ekle</button>
      </form>
      <ul className="flex flex-col gap-y-4 mt-6" ref={animation}>
      {isEmpty&&<li className="h-12 text-red-700 flex items-center px-4 bg-red-100 rounded">Bir görev girin.</li>}
      {todos.length===0&&!isEmpty?<li className="h-12 text-yellow-700 flex items-center px-4 bg-yellow-100 rounded">Hiç görev yok.</li>:null}
        {todos.map(item=>(
            <li className="bg-green-300 rounded flex items-center justify-between p-[12px]" key={item.id}>
              <span className={`text-green-700 ${item.durum?"text-decoration-line: line-through": ""}`} onClick={()=>degistir(item.id)}>{item.gorev}</span>
              <span onClick={()=>sil(item.id)} className="mr-4 px-4 py-1 rounded bg-red-600 text-white cursor-pointer">Sil</span>
            </li>
        ))}
      </ul>
    </div>


  );
}

export default App;
