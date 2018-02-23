import React from 'react';
import PropTypes from 'prop-types';
import { Ul , Li } from 'glamorous';
import DeleteIcon from '@tempus/tempus-component-library/icons/Delete';

const ListView = ({renderRow, dataSource, chnageOrder, header, removable, deleteItem }) => {
  const ulStyle = { padding: 0, width: '20%', backgroundColor: '#d3d3d3' };
  const liStyle = { position: 'relative',listStyleType: 'none', fontSize:16, margin:3, padding:5, textAlign: 'center' };
  const renderData = dataSource && dataSource.length > 0 ? dataSource.map((data, index) =>
    (<Li
      key={data+''+index}
      draggable
      onDragStart={(e) => {  e.dataTransfer.setData('text', index);}}
      onDrop={(e) => { e.preventDefault(); chnageOrder(e.dataTransfer.getData('text'), index); }}
      onDragOver={(e) => { e.preventDefault(); }}
      {...liStyle} >
        <div style={{ display:'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{}}>
            {data.label}
          </span>
          {removable && <DeleteIcon style={{ cursor: 'pointer' }} onClick={deleteItem} /> }
        </div>
        {renderRow(data)}
    </Li>)) : null;
  return(
    <Ul {...ulStyle}>
      <Li >{header}</Li>
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
