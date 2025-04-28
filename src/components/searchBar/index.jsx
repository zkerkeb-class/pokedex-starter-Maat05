import "./index.css";

const typesList = [
    "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire",
    "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison",
    "Psychic", "Rock", "Steel", "Water"
];
const SearchBar = ({ search, setSearch, types, setTypes }) => {
  return (
    <div>
      <input
        value={search}
        onChange={(e) => {
            setSearch(e.target.value)
        }}
        type="text"
        placeholder="Rechercher un pokemon"
        className="search-bar"
      />
      <div>
        {typesList.map((type) => {
            return <button 
            className={types.includes(type) ? 'active' : ''}
            onClick={() => {
              if(types.includes(type)){
                setTypes(types.filter((t) => t !== type))
              } else {
                setTypes([...types, type])
              }
            }}
            key={type}>{type}</button>
        })}
      </div>
    </div>
  );
};

export default SearchBar;