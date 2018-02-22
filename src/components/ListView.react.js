import React from 'react';
import PropTypes from 'prop-types';
import { Ul , Li } from 'glamorous';

const ListView = ({renderRow, dataSource, updateDataSource, moovable}) => {
  const ulStyle = { padding: 0, width: '20%' };
  const liStyle = { position: 'relative',listStyleType: 'none', fontSize:16, backgroundColor:'gray', margin:2, padding:5, textAlign: 'center' };
  const renderData = dataSource.map((data, index) =>
    (<Li
      key={data+''+index}
      draggable
      onDragStart={(e) => {  e.dataTransfer.setData('text', index);}}
      onDrop={(e) => { e.preventDefault(); updateDataSource(e.dataTransfer.getData('text'), index); }}
      onDragOver={(e) => { e.preventDefault(); }}
      {...liStyle} >
      {renderRow(data)}
      {moovable && <span style={{ position: 'absolute', zIndex:999, right: '5%', top: '15%'}}>=</span>}
    </Li>));
  return(
    <Ul {...ulStyle}>
        {renderData}
    </Ul>
  );
};

export default ListView;

ListView.propTypes = {
  // callback function to render the row in the listview
  renderRow: PropTypes.func,
  // listview data source to feed the data into the listview
  dataSource: PropTypes.array
};
