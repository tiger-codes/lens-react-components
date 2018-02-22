import React, {Component} from 'react';
import MultiSelectField from 'react-select';
// import {ExampleComponent} from '../src';
import { ListView } from '../src';

class Demo extends Component {
  constructor() {
    super();
    this.updateDataSource = this.updateDataSource.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {dataSource: ['nikhil', 'romil','divya', 'jay'], selections: []};
  }

  // handleChange(value) {
  //   this.setState({ selectedOption });
  // }

  updateDataSource(oldIndex, newIndex) {
    let dataSource = this.state.dataSource;
    if(newIndex < oldIndex) {
      dataSource.splice(newIndex, 0, dataSource[oldIndex]);
      dataSource.splice(parseInt(oldIndex)+1, 1);
    } else if( newIndex > oldIndex) {
      dataSource.splice(parseInt(newIndex)+1, 0, dataSource[oldIndex]);
      dataSource.splice(oldIndex, 1);
    }
    this.setState({dataSource});
  }

    render() {
        return (
            <div>
                <h1>lens-components Demo</h1>
                <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <MultiSelectField
              style={{width: '90%'}}
              name="form-field-name"
              value={{ value: data, label: data }}
              multiselect
              options={[
                { value: data, label: data },
                { value: 'two', label: 'Two' }
              ]}
            />}
            // renderRow={(data) => <div style={{position: 'relative'}}><TempusDropdown defaultValue={data} options={[{value: data,label:data},{value: 'sdsa',label:'asdsa'}]} /></div>}
            // renderRow={(data) => <DropDown options={[data,'sample']} />}
            renderHeader={() => {}}
            updateDataSource={this.updateDataSource}
            moovable
          />
                {/* <ExampleComponent
                    label="This is an example label"
                    value={this.state.value}
                    setProps={newProps => this.setState({value: newProps.value})}
                /> */}
                <hr/>
            </div>
        );
    }
}

export default Demo;
