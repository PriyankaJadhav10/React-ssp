import "./App.css";
import Cards from "./components/Cards";
import { useState , useEffect} from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Records from "./records.json";
import { DatePicker } from "antd";
import ReactPaginate from "react-paginate";
import ReactSearchBox from "react-search-box";
import moment from "moment";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// import YearPicker from "react-single-year-picker"
// import {DatesRangeInput} from 'semantic-ui-calender-react'

function App() {
  // functional component
  // const x = Records.splice(0,100);
  const dateFormat = "yyyy";

  const x = Records;
  const [allData, setData] = useState(x);
  const [filteredData, setFilteredData] = useState(x);
  
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [searchField, setSearchField] = useState("");

  const [yearSelected, setYearSelected] = useState("");
  const [titleSelected, setTitleSelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");

  const [pageNumber, setpageNumber] = useState(0);
  const perPage = 20;
  const offsetStart = pageNumber * perPage;
  const pageCount = Math.ceil(filteredData.length / perPage);

  //for pagination
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  
  // search
  const handleSearch = (event) => {
    let result = [];
    // const val =event.target.value;
    result = allData.filter((data) => {
      if (data.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
      data.status.toLowerCase().includes(event.target.value.toLowerCase()) 
      ) {
        return setTitleSelected && setStatusSelected;
      }

      else if(statusSelected && titleSelected ){
        return (
          data.title.toLowerCase().includes(searchField.toLowerCase()) &&
          data.status.setStatusSelected.includes(searchField.toLowerCase())
        );
      }

      else if(statusSelected && yearSelected){
        return (
          data.animeSeason.year === setYearSelected &&
          data.status === setStatusSelected.includes(event.target.value.toLowerCase())
        );
      }

      else if (yearSelected && titleSelected ) {
        return (
          data.animeSeason.year === setYearSelected &&
          data.title === setTitleSelected.includes(event.target.value)
        );
      }

    });
    console.log(event.target.value);
    setFilteredData(result);
  };

  // useEffect(() => {
  //   let animedata = require("./records.json");    
  //   setData(animedata.data)
  // }, [])

  // dropdown statusselect
  const handleChange = (event) => {
    const val = event.target.value;
    setStatusSelected(val);
    if (val === "All") {
      setFilteredData(allData);
    } 
    // else if(val==="statusSelected"){setStatusSelected(allData)}
    else if(val === "statusSelected" && val === "titleSelected"){
      const temp1 = allData.filter( (e) => e.setStatusSelected.toLowerCase() && e.setTitleSelected.toLowerCase() === val );
      setFilteredData(temp1);
    }
    else{
      const temp = allData.filter( (e) => e.status.toLowerCase() === val.toLowerCase() );
      setFilteredData(temp);

    }
    
    // else {
    //   const temp = allData.filter(
    //     (e) => e.status.toLowerCase() === val.toLowerCase()
    //   );
    //   setFilteredData(temp);
    // }
  };

  // for year selection
  const handleChange2 = (event) => {
    // console.log(event);
    
    const val1 = new Date(event._d).getFullYear();
    setYearSelected(val1)
     
    // if(val1 === "yearSelected" && val1 === "titleSelected" ){
    //   setYearSelected && setTitleSelected(val1)
    // }

    
    const temp1 = allData.filter((e) => {
      if(e.animeSeason.year === val1)
      {return true;}
      else if(e.animeSeason.year === val1 && e.titleSelected === val1)
      {return true}
    });
    setFilteredData(temp1);

  };

  return (
    // <div className="App" style={{ display: "block" ,padding :10 }}>
    <div className="App" style={{ padding: 10, overflow: "auto" }}>
      {/* <Pagination count={20} /> */}
      {/* <h1 className='f1'>AnimeFriend</h1> */}
      <div
        className=""
        style={{ display: "flex", padding: 10, backgroundColor: "#556855" }}
      >
        <Form.Floating style={{ width: "1450px" }}>
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Search Here"
            onChange={(event) => handleSearch(event)}
            // onChange={handleSearch}
          />
          <label htmlFor="floatingInputCustom">Search...</label>
        </Form.Floating>
      </div>
      {/* <label htmlFor="floatingInputCustom">Search</label> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#556855",
        }}
      >
        <div className="" style={{ display: "flex", padding: 10 }}>
          <select
            style={{ width: "300px" }}
            onChange={(event) => handleChange(event)}
          >
            <option value="All">All</option>
            <option value="FINISHED">FINISHED</option>
            <option value="ONGOING">ONGOING</option>
            <option value="UPCOMING">UPCOMING</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </select>
        </div>
        <div style={{ display: "flex", padding: 10 }}>
          <DatePicker
            style={{ width: "300px" }}
            picker="year"
            onChange={(event) => handleChange2(event)}
          />
        </div>
        <div style={{ display: "flex", padding: 10 }}>
          {filteredData.length > 1 ? (
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          ) : null}
        </div>
        {/* for rangepicker year
          <DatePicker.RangePicker picker='year'/> */}
      </div>
      {/* , grid-gap: '20px' */}
      <div
        style={{
          padding: 10,
          marginBottom: "0",
          marginTop: "0",
          overflow: "auto",
        }}
      >
        {filteredData.length > 1 && (
          <Cards
            data={filteredData.slice(offsetStart, offsetStart + perPage)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
