import PropTypes from "prop-types";
import "./ListManager.css";

// Definícia komponentu ListManager
function ListManager({ setCurrentList }) {
  // Funkcia na zmenu aktuálneho zoznamu úloh
  const handleListChange = (listName) => {
    // Nastavenie nového zoznamu úloh
    setCurrentList(listName);
  };

  return (
    <div className="list-manager">
      <button onClick={() => handleListChange("Default")}>Default List</button>
      <button onClick={() => handleListChange("Work")}>Work List</button>
      <button onClick={() => handleListChange("Personal")}>
        Personal List
      </button>
    </div>
  );
}

ListManager.propTypes = {
  setCurrentList: PropTypes.func.isRequired,
};

export default ListManager;
