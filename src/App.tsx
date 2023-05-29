import React, { useState } from "react";
// @ts-ignore
import * as Papa from 'papaparse';
function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault(); 
    if (file) {
      fileReader.onload = function (event: any) {
        const csvOutput = event.target.result;
      };
      fileReader.readAsText(file);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const rowsArray: any = [];
          const valuesArray: any = [];
  
          // Iterating data to get column name and their values
          results.data.map((d: any) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
  
          // Parsed Data Response in array format
          setParsedData(results.data);
  
          // Filtered Column Names
          setTableRows(rowsArray[0]);
  
          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value: any, index) => {
            return (
              <tr key={index}>
                {value.map((val: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, i: React.Key | null | undefined) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
