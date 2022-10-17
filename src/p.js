import "./App.css";
import Cards from "./components/Cards";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Records from "./records.json";
import ReactPaginate from "react-paginate";


function App() {
  // functional component
  const x = Records.splice(0, 400);
  const [allData, setData] = useState(x);
  const [filteredData, setFilteredData] = useState(x);
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
    result = filteredData.filter((data) => {
      if (data.title.toLowerCase().includes(event.target.value.toLowerCase()))
      {
        return data;
      } 
    });
   setFilteredData(result);
  };

  // dropdown
  const handleChange = (event) => {
    const val = event.target.value;
    const temp = allData.filter(e => e.status.toLowerCase() === val.toLowerCase());
    setFilteredData(temp);
  };

  return (
    <div className="App" style={{ display: "block", padding: 30 }}>
      {/* <Pagination count={20} /> */}
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="Search Here"
          onChange={(event) => handleSearch(event)}
        />
        <label htmlFor="floatingInputCustom">Search</label>
        <Row>
          <Col>
        <select onChange={(event) => handleChange(event)}>
          <option value="FINISHED">FINISHED</option>
          <option value="ONGOING">ONGOING</option>
          <option value="UPCOMING">UPCOMING</option>
        </select>
        </Col>
        
        <Col>
        <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      </Col>
</Row>
<Cards data={filteredData.slice(offsetStart, offsetStart + perPage)} 
 />

      </Form.Floating>
    </div>
  );
}

export default App;
