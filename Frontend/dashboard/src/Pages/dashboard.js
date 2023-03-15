import React, { useState }  from "react";
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Dashboard/Header';
import './dashboard.css'
import PieChart from '../Components/Dashboard/PieChart';
import DataRecord from "../Components/Dashboard/DataRecord";

function Dashboard() {

  const [sarcasmNumber, setSarcasmNumber] = useState(110);
  const [regularNumber, setRegularNumber] = useState(20);
  const [totalNumber, setTotalNumber]     = useState(130)

  const [classArr, setClassArr] = useState(["Regular","Regular","Regular","Sarcasm","Sarcasm","Sarcasm",]);
  const [sentenceArr, setSentenceArr] = useState(["Hello World 1","Hello World 2","Hello World 3","Hello World 4","Hello World 5","Hello World 5"]);

  // const [sarcsmArr, sarcasmArr] = useState(["Hello World 1","Hello World 2","Hello World 3"]);
  // const [regularArr, setRegularArr] = useState(["Hello World 4","Hello World 5","Hello World 5"]);
  let sarcasmArr = ["Hello World 1","Hello World 2","Hello World 3"];
  let regularArr = ["Hello World 4","Hello World 5","Hello World 5"];

  console.log(sarcasmArr)

  return (
    <div>
      <Navbar/>

      <div className="dashboard">
        <div className="column">
          <PieChart sarcasmNumber={sarcasmNumber} regularNumber={regularNumber}/>
          <Header sarcasmNumber={sarcasmNumber} totalNumber={totalNumber}/>
        </div>
        <div className="column">
          <div className="downloadFile">DonwloadFile</div>
        </div>
      </div>



      <div className="dashboard">
        <div className="column">
            {/* data list for sarcastic class */}
            <h1 className="heading">Sarcasm Class</h1>
            <p className="columnIntro">Following Records are the sarcastic Tweets found in the dataset. You can delete them or manually change the data record class</p>
            <div className='datalist'>
              {sarcasmArr.map((sentence, index) => (
                <DataRecord key={index} sentence={sentence} label="Sarcasm" />
              ))}
            </div>
        </div>
        <div className="column">
            {/* data list for regular class */}
            <h1 className="heading">Regular Class</h1>
            <p className="columnIntro">Following Records are the regular Tweets found in the dataset. You can delete them or manually change the data record class</p>
            {regularArr.map((sentence, index) => (
                <DataRecord key={index} sentence={sentence} label="Regular" />
              ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Dashboard;