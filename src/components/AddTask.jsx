import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import "./AddTask.css";

// Definícia komponentu AddTask
function AddTask({
  input,
  setInput,
  tags,
  setTags,
  editTask,
  setEditTask,
  saveTaskToAPI,
  updateTask,
  currentList,
}) {
  // Lokálny stav pre prioritu a dátum splnenia úlohy
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Funkcia na resetovanie formulára na predvolené hodnoty
  const resetForm = useCallback(() => {
    setInput("");
    setTags("");
    setPriority("Medium");
    setDueDate("");
  }, [setInput, setTags]);

  // Hook na aktualizáciu formulára pri zmene editovanej úlohy
  useEffect(() => {
    if (editTask) {
      setInput(editTask.title);
      setTags(editTask.tags.join(", "));
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate);
    } else {
      resetForm();
    }
  }, [editTask, resetForm, setInput, setTags]);

  // Funkcia na spracovanie odoslania formulára
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Kontrola, či názov úlohy nie je prázdny
    if (!input.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    // Rozdelenie značiek podľa čiarky a odstránenie prázdnych miest
    const taskTags = tags.split(",").map((tag) => tag.trim());

    if (!editTask) {
      // Vytvorenie novej úlohy
      const newTask = {
        title: input,
        completed: false,
        priority: priority,
        dueDate: dueDate,
        tags: taskTags,
        list: currentList,
      };

      // Uloženie novej úlohy do API
      await saveTaskToAPI(newTask);
       // Resetovanie formulára
      resetForm();
    } else {
      const updatedTask = {
        ...editTask,
        title: input,
        tags: taskTags,
        priority: priority,
        dueDate: dueDate,
      };
      // Aktualizácia úlohy v API
      await updateTask(editTask.id, updatedTask);
      // Resetovanie formulára
      resetForm();
      // Vymazanie editovanej úlohy zo stavu
      setEditTask(null);
    }
  };

  // Funkcie na spracovanie zmien vstupných polí
  const handleChange = (evt) => {
    setInput(evt.target.value);
  };

  const handleTagChange = (evt) => {
    setTags(evt.target.value);
  };

  const handlePriorityChange = (evt) => {
    setPriority(evt.target.value);
  };

  const handleDueDateChange = (evt) => {
    setDueDate(evt.target.value);
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="inp1"
          placeholder="Write Task here ✍️"
          onChange={handleChange}
          value={input}
          aria-label="Task title"
        />
        <input
          type="text"
          className="inp1"
          placeholder="Tags (comma separated)"
          onChange={handleTagChange}
          value={tags}
          aria-label="Task tags"
        />
        <select
          className="inp1"
          onChange={handlePriorityChange}
          value={priority}
          aria-label="Task priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          className="date-input inp1"
          onChange={handleDueDateChange}
          value={dueDate}
          aria-label="Task due date"
        />
        <button
          className="btn"
          aria-label={editTask ? "Edit task" : "Add task"}
        >
          {editTask ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
}

AddTask.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  setTags: PropTypes.func.isRequired,
  editTask: PropTypes.object,
  setEditTask: PropTypes.func.isRequired,
  saveTaskToAPI: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  currentList: PropTypes.string.isRequired,
};

export default AddTask;
