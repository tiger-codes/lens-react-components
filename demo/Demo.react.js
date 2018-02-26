import React, {Component} from 'react';
import MultiSelectField from 'react-select';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ListView, AddFilter } from '../src';
import 'react-select/dist/react-select.css';
import lensData from './lens.json';

const getOrderedData = function (filter) {
  return filter.order.map((item) =>  ({
      label: item[0].trim().concat('.', item[1].trim()),
      filterName: item[1].trim(),
      value: filter.filters[item[0].trim()][item[1].trim()].map(val => ({label: val, value: val}))
    }));
};
const filter = {
  filters: {
    Meta: {
      parent_organization: ["test"],
      project_name: ["Tempus"],
      gender: ["male","female"],
      race: ["white"]
    },
    Cancer: {
      cancer_site_name: ["pancreatic cancer"],
      cancer_name: ["pancreatic cancer"]
    }
  },
  order: [
      ["Meta", "parent_organization"],
      ["Meta", "project_name "],
      ["Meta ", "gender "],
      ["Meta ", "race "],
      ["Cancer ", "cancer_site_name "],
      ["Cancer ", "cancer_name "]
    ]
  };
// Default selected filters for filter panel
const defaultValue = getOrderedData(filter);

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
      //update order of this array in the filters[oldIndex].label.split('.')
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
    const elementType = lensData.renderObj[item.filterName];
    console.log('dropdown', item.value);
    return elementType === 'dropdown'
    ? <MultiSelectField multi value={item.value} multiselect options={item.value} />
    : <Range />
  }

    render() {
      const headerElement = <AddFilter
        placeholder="Add Filters"
        data={this.state.options}
        onChange={this.handleChange}
        value={this.state.selectedOption} />;

        return (
            <div>
              <h1>Lens Components Demo</h1>
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
