import { useCallback, useEffect, useState } from "react";
import { getDataFromApi } from "./apis/apiCalls";

import Pagination from "./components/pagination/Pagination";
import Search from "./components/search/Search";
import Table from "./components/table/Table";

function App() {
  //possible state during api call
  const AvailableStates = {
    NEW: "NEW",
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
  };
  //using this to kepp track of api response
  const [currentState, setCurrentState] = useState(AvailableStates.NEW);

  //using this to store the response from the api
  const [apiData, setApiData] = useState([]);

  //using this to keep track of the current page
  const [page, setPage] = useState(1);

  //using to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  const [sort, setSort] = useState("");

  //fetching the data on load from the api and whenever we change the page number during pagination or if we search
  useEffect(() => {
    const fetchData = async () => {
      setCurrentState(AvailableStates.LOADING);
      let res;
      try {
        if (searchQuery) {
          res = await getDataFromApi(
            `https://swapi.dev/api/people/?search=${searchQuery}`
          );
        } else {
          res = await getDataFromApi(
            `https://swapi.dev/api/people/?page=${page}`
          );
        }

        if (res.status === 200) {
          setCurrentState(AvailableStates.SUCCESS);
          setApiData(res.data.results);
        } else {
          setCurrentState(AvailableStates.ERROR);
        }

        //console.log(res.data.results);
      } catch (error) {
        console.log(error);
        setCurrentState(AvailableStates.ERROR);
      }
    };

    fetchData();
  }, [page, searchQuery]);

  //function to get the value of page no from pagination component and setting the page state value
  const handlePageCLick = (e) => {
    const { value } = e.target;

    if (value === "prev") {
      setPage((previous) => previous - 1);
    } else if (value === "next") {
      setPage((previous) => previous + 1);
    } else {
      setPage(value);
    }
  };

  /* ********************************************************** HANDLING SEARCH ************************************************************************/

  //debounce function to delay the number of api call until user stops typing
  const debounce = (func) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, 500);
    };
  };
  //handles the gets the value from search input and set the searchQuery state
  const handleChange = (e) => {
    //setting the page state to 1 since we need to get the first page if the search field is empty
    if (searchQuery.length === 0) {
      setPage(1);
    }
    setSearchQuery(e.target.value);
    //console.log(searchQuery);
  };
  const optimisedHandleChange = useCallback(debounce(handleChange), []);

  /* ************************************************************* HANDLING SORT ************************************************************************ */
  // setting the sort state
  const handleSort = (val) => {
    setSort(val);
    console.log(val);
  };
  //sorting based on the value sort state
  useEffect(() => {
    if (sort === "asc") {
      setApiData((prevApiData) => {
        return [...prevApiData].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      });
    } else if (sort === "dsc") {
      setApiData((prevApiData) => {
        return [...prevApiData].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      });
    }
  }, [sort]);

  return (
    <div className="App" style={{ margin: "10px 40px" }}>
      <div>Page No. {page}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          page={page}
          totalPage={9}
          handlePageCLick={handlePageCLick}
        />
        <Search
          handleChange={optimisedHandleChange}
          searchQuery={searchQuery}
        />
      </div>

      <Table
        currentState={currentState}
        apiData={apiData}
        AvailableStates={AvailableStates}
        handleSort={handleSort}
      ></Table>
    </div>
  );
}

export default App;
