
import React, { Component, Fragment } from "react";
import JapaneseColor from './japaneseColor.js';
import ChineseColor from './chineseColor.js';

import './App.css';

const ColumnNumber = 15;
const ChineseColumns = [[]];

let chineseCount = 0;

ChineseColor.forEach(color => {
  if (chineseCount === ColumnNumber) {
    chineseCount = 1;
    ChineseColumns.push([color]);
  } else {
    chineseCount += 1;

    let index = ChineseColumns.length - 1;
    ChineseColumns[index].push(color);
  }
})

// console.log(ChineseColumns);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentName: "",
      currentHex: "#ffffff",
    };
  }

  handleBoxClick(name, hex) {
    this.setState({ "currentName": name, "currentHex": hex });
  }

  createBoxes(column) {
    return <div className="column">
      {
        column.map((obj, i) => {
          const {name, hex} = obj;
          
          return <div 
            key={i}
            className="box" 
            style={{"backgroundColor": hex}} 
            onClick={this.handleBoxClick.bind(this, name, hex)}
          />;
        })
      }
    </div>;
  }

  createName(name) {
    let nameArray = name.split(" ");

    if (nameArray.length === 1) {
      return <h2>{name}</h2>
    } else {
      return (
        <Fragment>
          <h2>{nameArray[0]}</h2>
          <h3>{nameArray[1]}</h3>
        </Fragment>
      )
    }
  }

  render () {
    const {currentName, currentHex} = this.state;
    
    return (
      <div className="App" style={{"backgroundColor": currentHex}} >
        <div className="word_section">
          {this.createName(currentName)}
          <h2>{currentHex}</h2>
        </div>

        <div className="color_section">
          <div className="section">
            {JapaneseColor.map(this.createBoxes.bind(this))}
          </div>

          <div className="section">
            {ChineseColumns.map(this.createBoxes.bind(this))}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
