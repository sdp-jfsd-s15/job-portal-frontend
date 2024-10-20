import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected ? 'page' : undefined}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function BottomNav({ value, handleChange }) {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        sx={{ '& .MuiTab-root': { color: '#000' }, '& .Mui-selected': { color: '#073a8c' } }}
      >
        <LinkTab label="Grow" />
        <LinkTab label="Catch up" />
      </Tabs>
    </Box>
  );
}
