import React, {Component} from 'react';
import MultiSelectField from 'react-select';
import { ListView, AddFilter } from '../src';
import 'react-select/dist/react-select.css';
import lensData from './lens.json';

// Default selected filters for filter panel
const defaultValue = [{
  label: 'Meta.parent_organization',
  value: 'parent_organization'
},
{
  label: 'Meta.menopausal_status',
  value: 'menopausal_status'
}];

class Demo extends Component {
  constructor() {
    super();
    this.chnageOrder = this.chnageOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    const dropDownData = lensData.filters.fields;
    let dpData = [];
    for(let prop in dropDownData) {
      if(dropDownData.hasOwnProperty(prop)) {
        dpData = [...dpData, ...dropDownData[prop].map((rec) => ({ label: prop.concat('.',rec), value: rec }))]
      }
    }
    this.state = { filters: defaultValue, selectedOption: null, options: dpData };
  }


  handleChange(value) {
    this.setState((prev) => ({ filters:[...prev.filters, value ], selectedOption: null }));
  }

  deleteItem(index) {
    let filters = this.state.filters;
    filters.splice(index, 1);
    this.setState({filters});
  }

  chnageOrder(oldIndex, newIndex) {
    let filters = this.state.filters;
    if(newIndex < oldIndex) {
      filters.splice(newIndex, 0, filters[oldIndex]);
      filters.splice(parseInt(oldIndex)+1, 1);
    } else if( newIndex > oldIndex) {
      filters.splice(parseInt(newIndex)+1, 0, filters[oldIndex]);
      filters.splice(oldIndex, 1);
    }
    this.setState({filters});
  }

  renderItem(item) {
    const elementType = lensData.renderObj[item.value];
    return elementType === 'dropdown'
    ? <MultiSelectField value={null} multiselect options={defaultValue} />
    : <span>Range</span>
  }

    render() {
      const headerElement = <AddFilter
        placeholder="Add Filters"
        data={this.state.options}
        onChange={this.handleChange}
        value={this.state.selectedOption} />;

        return (
            <div>
              <h1>lens-components Demo</h1>
              <ListView
                header={headerElement}
                dataSource={this.state.filters}
                renderRow={this.renderItem}
                chnageOrder={this.chnageOrder}
                moovable
                removable
                deleteItem={this.deleteItem}
              />
            </div>
        );
    }
}

export default Demo;
