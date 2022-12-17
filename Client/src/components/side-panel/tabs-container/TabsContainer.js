import React from 'react'
import './TabsContainer.css'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Checkbox } from '@mui/material'
import Listings from '../listings/Listings'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}


const TabsContainer = (props) => {
  const SELECT_ALL_PROPERTIES = 'Select all properties';
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    props.onTabChange(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          varia-label="basic tabs example"
        >
          <Tab
            style={{ textTransform: 'none', fontSize: 12 }}
            label={`Comp Set (${props.listCounts[0]})`}
          />
          <Tab
            style={{ textTransform: 'none', fontSize: 12 }}
            label={`Other properties (${props.listCounts[1]})`}
          />
          <Tab
            style={{ textTransform: 'none', fontSize: 12 }}
            label={`Hotels (${props.listCounts[2]})`}
          />
        </Tabs>
      </Box>
      <div style={{ color: '#787878', marginTop: 10 }}>
        {' '}
        <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 17 } }}
          style={{ marginLeft: 4 }}
        />
        <span>{SELECT_ALL_PROPERTIES}</span>
      </div>
      <TabPanel value={value} index={0}>
        <Listings {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Listings {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Listings {...props} />
      </TabPanel>
    </Box>
  )
}

export default TabsContainer;