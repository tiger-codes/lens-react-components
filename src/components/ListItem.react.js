import React from 'react';

const ListItem = ({ style, value, onClick }) => (
  <div style={style} onClick={(e) => onClick(e.target.innerHTML)}>{value}</div>
);

export default ListItem;
