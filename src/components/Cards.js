import React from "react";
// import "./App.css"

const Cards = (props) => {
  return (
    <div className="Card" style={{ display: "flex", flexWrap: "wrap" }}>
      {props.data &&
        props.data.map((record, index) => {
          console.log(record);
          return (
            <div className="box" key={`${record.title}-${index}`} style={{border: "solid"}}>
              <div>
                <img src={record.picture} width="350" height="300" alt="" style={{border: "solid",padding:'3px'}}/>
              </div>

              <br />
              <div>
                {record.title}
                <br />
              </div>
              <div>
                Episodes : {record.episodes}
                <br />
              </div>
              <div>
                Status : {record.status}
                <br />
              </div>
              <div>
                Year: {record.animeSeason.year}
                <br />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cards;
