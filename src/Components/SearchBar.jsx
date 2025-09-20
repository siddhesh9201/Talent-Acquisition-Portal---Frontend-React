function SearchBar({ changeHandle, clickHandle }) {
  return (
    <div style={{ width: "70rem" }}>
      <form className="d-flex" role="search" onSubmit={clickHandle}>
        <input
          onChange={changeHandle}
          className="form-control me-2"
          type="search"
          placeholder="Enter Job Title..."
          aria-label="Search"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
