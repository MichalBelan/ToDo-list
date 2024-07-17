import PropTypes from "prop-types";
import "./Header.css";

// Definícia komponentu Header
function Header({ tasks, currentList }) {
  // Filtrovanie úloh, ktoré sú dokončené
  const completedTasks = tasks.filter((task) => task.completed);
  // Celkový počet úloh
  const totalTasks = tasks.length;

  // Funkcia na zobrazenie správy na základe počtu úloh a dokončených úloh
  const taskMessage = () => {
    if (totalTasks === 0) return <p>Add a task 📝</p>;
    if (completedTasks.length === totalTasks) return <p>Good job!💪</p>;
    if (completedTasks.length >= totalTasks / 2)
      return <p>Exceed Your Boundaries. Right Here. Right Now.🎯</p>;
    return <p>🔥Keep Moving Forward 🏃‍♂️</p>;
  };

  return (
    <header className="header-container">
      <div className="content">
        <h1>
          {completedTasks.length}/{totalTasks} Tasks in {currentList}
        </h1>
        {taskMessage()}
        <h2>📌TO-DO List📋</h2>
      </div>
    </header>
  );
}

Header.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentList: PropTypes.string.isRequired,
};

export default Header;
