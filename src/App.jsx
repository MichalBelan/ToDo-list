import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import ListManager from "./components/ListManager";

function App() {
  // useState hook na spravovanie stavu režimu (tmavý/svetlý)
  const [mode, setMode] = useState(true);
  // useState hook na spravovanie zoznamu úloh
  const [tasks, setTasks] = useState([]);
  // useState hook na spravovanie vstupu pre novú úlohu
  const [input, setInput] = useState("");
  // useState hook na spravovanie značiek pre úlohy
  const [tags, setTags] = useState("");
   // useState hook na spravovanie úlohy, ktorá sa práve edituje
  const [editTask, setEditTask] = useState(null);
   // useState hook na spravovanie aktuálne vybraného zoznamu úloh
  const [currentList, setCurrentList] = useState("Default");

  // Konštanta s URL API pre úlohy
  const API_URL = "https://6694d9cc4bd61d8314c8e5df.mockapi.io/api/v1/todos";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // GET požiadavka na API pre načítanie úloh
        const response = await axios.get(API_URL);
        // Nastavenie stavu úloh s dátami z API
        setTasks(response.data);
      } catch (error) {
        // Vypísanie chyby do konzoly v prípade zlyhania požiadavky
        console.error("Error fetching tasks:", error);
      }
    };
    // Volanie funkcie na načítanie úloh
    fetchTasks();
  }, []);

  // Funkcia pre uloženie novej úlohy do API
  const saveTaskToAPI = async (task) => {
    try {
      // POST požiadavka na API pre uloženie novej úlohy
      const response = await axios.post(API_URL, task);
      // Aktualizácia stavu úloh pridaním novej úlohy
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      // Vypísanie chyby do konzoly v prípade zlyhania požiadavky
      console.error("Error saving task:", error);
    }
  };

  // Funkcia pre aktualizáciu existujúcej úlohy v API
  const updateTaskInAPI = async (id, updatedTask) => {
    try {
      // PUT požiadavka na API pre aktualizáciu úlohy podľa ID
      const response = await axios.put(`${API_URL}/${id}`, updatedTask);
      // Aktualizácia stavu úloh s aktualizovanou úlohou
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
    } catch (error) {
      // Vypísanie chyby do konzoly v prípade zlyhania požiadavky
      console.error("Error updating task:", error);
    }
  };

  // Funkcia pre zmazanie úlohy z API
  const deleteTaskFromAPI = async (id) => {
    try {
      // DELETE požiadavka na API pre zmazanie úlohy podľa ID
      await axios.delete(`${API_URL}/${id}`);
      // Aktualizácia stavu úloh odfiltrovaním zmazanej úlohy
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      // Vypísanie chyby do konzoly v prípade zlyhania požiadavky
      console.error("Error deleting task:", error);
    }
  };

  // Funkcia pre prepínanie režimu (tmavý/svetlý)
  const handleMode = () => {
    // Nastavenie opačného režimu
    setMode(!mode);
  };

  // Filtrovanie úloh podľa aktuálneho zoznamu
  const filteredTasks = tasks.filter((task) => task.list === currentList);

  return (
    <div className={mode ? "dark" : "light"}>
      <div className="container">
        <div className="modes" onClick={handleMode}>
          {mode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </div>
        <div className="todo-container">
          <Header tasks={filteredTasks} currentList={currentList} />
          <AddTask
            input={input}
            setInput={setInput}
            tags={tags}
            setTags={setTags}
            editTask={editTask}
            setEditTask={setEditTask}
            saveTaskToAPI={saveTaskToAPI}
            updateTask={updateTaskInAPI}
            currentList={currentList}
          />
          <TaskList
            tasks={filteredTasks}
            setTasks={setTasks}
            setEditTask={setEditTask}
            deleteTask={deleteTaskFromAPI}
            updateTask={updateTaskInAPI}
          />
          <ListManager setCurrentList={setCurrentList} />
        </div>
      </div>
    </div>
  );
}

export default App;
