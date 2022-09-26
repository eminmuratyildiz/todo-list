import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSelector, useDispatch } from "react-redux";
import { ekle, sil, degistir } from "./stores/todoSlice";

function App() {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [animation] = useAutoAnimate();
  const [isEmpty, setIsEmpty] = useState(false)
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(ekle(todo));
    setTodo("");
    if(todo===""){
      setIsEmpty(true);
      setTimeout(()=>setIsEmpty(false),1500);
    }
  }
  return (
    <div className="max-w-xl mobil:px-4 mx-auto py-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Yapılacaklar Listesi</h1>
      <form className="flex gap-x-4" onSubmit={handleSubmit}>
        <input className="border rounded flex-1 indent-2 h-10" autoFocus type="text" placeholder="Bir görev yazın" onChange={e => setTodo(e.target.value)} value={todo} />
        <button className="bg-teal-600 text-white px-3 h-10 rounded" type="submit">Ekle</button>
      </form>
      <ul className="flex flex-col gap-y-4 mt-6" ref={animation}>
        {isEmpty && <li className="h-12 text-red-700 flex items-center px-4 bg-red-100 rounded">Bir görev girin.</li>}
        {todos.length === 0 && !isEmpty ? <li className="h-12 text-yellow-700 flex items-center px-4 bg-yellow-100 rounded">Hiç görev yok.</li> : null}
        {todos.map(item => (
          <li className="bg-green-300 rounded flex items-center justify-between p-[12px]" key={item.id}>
            <span className={`text-green-700 ${item.durum ? "text-decoration-line: line-through" : ""}`} onClick={() => dispatch(degistir(item.id))} >{item.gorev}</span>
            <span onClick={() => dispatch(sil(item.id))} className="mr-4 px-4 py-1 rounded bg-red-600 text-white cursor-pointer">Sil</span>
          </li>
        ))}
      </ul>
    </div>


  );
}

export default App;
