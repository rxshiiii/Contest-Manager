const FilterBar = ({ platforms = [], selectedPlatform, onFilterChange }) => {
    return (
      <div className="flex gap-4 p-4 bg-gray-100 rounded-md shadow-md overflow-x-auto">
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            selectedPlatform === "" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onFilterChange("")}
        >
          All
        </button>
  
        {platforms.map((platform) => (
          <button
            key={platform}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedPlatform === platform ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onFilterChange(platform)}
          >
            {platform}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterBar;
  