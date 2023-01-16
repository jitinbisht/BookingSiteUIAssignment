import React from 'react'
import './App.css'
import 'antd/dist/antd.min.css';
import SidePanel from './components/side-panel/SidePanel'
import Map from './components/map/Map'
import getFilteredListings from './services/getFilteredListingsService'
import { Stack } from '@mui/material'

function App() {
  const [properties, setProperties] = React.useState([])
  const [propertiesBackup, setPropertiesBackup] = React.useState([])
  const [filteredProperties, setFilteredProperties] = React.useState([])
  const [selectedPropertyID, setSelectedPropertyID] = React.useState('')
  const [hoveredProperty, setHoveredProperty] = React.useState({})
  const [listCounts, setListCounts] = React.useState([0, 0, 0])

  const updateTabCount = (listings) => {
    setListCounts([
      listings.filter((item) => item.propertyType === 'Corporate apartment')
        .length,
      listings.filter(
        (item) =>
          item.propertyType !== 'Studio' &&
          item.propertyType !== 'Corporate apartment',
      ).length,
      listings.filter((item) => item.propertyType === 'Studio').length,
    ])
  }

  const updateListing = (tabId, listings) => {
    if (tabId === 0) {
      setPropertiesBackup(
        listings.filter((item) => item.propertyType === 'Corporate apartment'),
      )
    } else if (tabId === 2) {
      setPropertiesBackup(
        listings.filter((item) => item.propertyType === 'Studio'),
      )
    } else {
      setPropertiesBackup(
        listings.filter(
          (item) =>
            item.propertyType !== 'Studio' &&
            item.propertyType !== 'Corporate apartment',
        ),
      )
    }
  }

  const onTabChange = (tabId) => {
    updateListing(tabId, properties)
  }

  React.useEffect(() => {
    (async () => {
      try {
        let requestParams = {
          region: 'Paris',
          maxLat: 48.864716,
          minLat: 48.644159,
          maxLong: 2.492639,
          minLong: 2.262097,
          maxBedrooms: null,
          minBedrooms: 0,
          maxBathrooms: null,
          minBathrooms: 0,
        };
        console.log('====1=====')
        const propertiesList = await getFilteredListings(requestParams)
        setProperties(propertiesList)
        setPropertiesBackup(propertiesList)
        setFilteredProperties(propertiesList)
        updateTabCount(propertiesList)
        updateListing(0, propertiesList)
      } catch (err) {
        console.log('Error while calling API')
      }
    })()
  }, [])

  const setPropertyID = (propertyId) => {
    /** On hovering the map markers, it checks the property number and
     *  apply the css on the selected property in the panel */
    setSelectedPropertyID(propertyId)
  }

  return (
    <div style={{ maxHeight: '100%' }}>
      <Stack direction="row" spacing={0.1}>
        <SidePanel
          listings={propertiesBackup}
          properties={properties}
          setPropertiesBackup={setPropertiesBackup}
          filteredProperties={filteredProperties}
          setFilteredProperties={(newList) => setFilteredProperties(newList)}
          style={{ minWidth: 380, padding: 0 }}
          selectedPropertyID={selectedPropertyID}
          setHoveredProperty={(listing) => setHoveredProperty(listing)}
          onTabChange={onTabChange}
          listCounts={listCounts}
          updateTabCount={updateTabCount}
          setProperties={setProperties}
        />
        <Map
          listings={propertiesBackup}
          filteredProperties={filteredProperties}
          setSelectedPropertyID={(propertyId) => setPropertyID(propertyId)}
          hoveredProperty={hoveredProperty}
        />
      </Stack>
    </div>
  )
}

export default App;
