import PropTypes from "prop-types";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { RiDeleteBin6Line, RiEditBoxFill } from "react-icons/ri";
import "./TaskList.css";

// Definícia komponentu TaskList
function TaskList({ tasks, setTasks, setEditTask, deleteTask, updateTask }) {
  // Funkcia na zaškrtnutie alebo odškrtnutie úlohy
  const handleClick = async (taskObj) => {
    // Aktualizácia stavu úlohy (preklopenie hodnoty completed)
    const updatedTask = { ...taskObj, completed: !taskObj.completed };
    // Aktualizácia úlohy na serveri
    await updateTask(taskObj.id, updatedTask);
    // Aktualizácia stavu úloh v aplikácii
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskObj.id ? updatedTask : task))
    );
  };

  // Funkcia na zmazanie úlohy
  const handleDelete = async (taskObj) => {
    // Zmazanie úlohy na serveri
    await deleteTask(taskObj.id);
    // Aktualizácia stavu úloh v aplikácii odfiltrovaním zmazanej úlohy
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskObj.id));
  };

  // Funkcia na editáciu úlohy
  const handleEdit = (taskObj) => {
    // Nastavenie editovanej úlohy do stavu
    setEditTask(taskObj);
  };

  // Podmienka na zobrazenie správy, keď nie sú k dispozícii žiadne úlohy
  if (tasks.length === 0) {
    return <p>No tasks available. Add a task! ✍️</p>;
  }

  // Renderovanie zoznamu úloh
  return (
    <div className="task-list">
      {tasks.map((taskObj) => (
        <div className="task-list-container" key={taskObj.id}>
          <div className="box">
            <div className="checkBox" onClick={() => handleClick(taskObj)}>
              {taskObj.completed ? (
                <ImCheckboxChecked
                  className="check"
                  aria-label="Task completed"
                />
              ) : (
                <ImCheckboxUnchecked
                  className="check"
                  aria-label="Task not completed"
                />
              )}
            </div>
            <input
              type="text"
              className={taskObj.completed ? "done" : "inp"}
              value={taskObj.title}
              readOnly
              aria-label={`Task title: ${taskObj.title}`}
            />
            <span className={`priority ${taskObj.priority}`}>
              {taskObj.priority}
            </span>
            {taskObj.dueDate && (
              <span>
                Date: {new Date(taskObj.dueDate).toLocaleDateString()}
              </span>
            )}
            <div>{taskObj.tags.join(", ")}</div>
            <div className="Btns">
              <RiDeleteBin6Line
                className="delete"
                onClick={() => handleDelete(taskObj)}
                aria-label="Delete task"
              />
              <RiEditBoxFill
                className="edit"
                onClick={() => handleEdit(taskObj)}
                aria-label="Edit task"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
