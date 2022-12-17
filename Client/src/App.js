import React from 'react'
import './App.css'
import 'antd/dist/antd.min.css';
import SidePanel from './components/side-panel/SidePanel'
import Map from './components/map/Map'
import getFilteredListings from './services/getFilteredListingsService'
import { Stack } from '@mui/material'

function App() {
  const [listings, setListings] = React.useState([])
  const [listingsBackup, setListingsBackup] = React.useState([])
  const [filteredListings, setFilteredListings] = React.useState([])
  const [selectedListingNumber, setSelectedListingNumber] = React.useState(0)
  const [hoveredListing, setHoveredListing] = React.useState({})
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
      setListingsBackup(
        listings.filter((item) => item.propertyType === 'Corporate apartment'),
      )
    } else if (tabId === 2) {
      setListingsBackup(
        listings.filter((item) => item.propertyType === 'Studio'),
      )
    } else {
      setListingsBackup(
        listings.filter(
          (item) =>
            item.propertyType !== 'Studio' &&
            item.propertyType !== 'Corporate apartment',
        ),
      )
    }
  }

  const onTabChange = (tabId) => {
    updateListing(tabId, listings)
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
        const respListings = await getFilteredListings(requestParams)
        setListings(respListings)
        setListingsBackup(respListings)
        setFilteredListings(respListings)
        updateTabCount(respListings)
        updateListing(0, respListings)
      } catch (err) {
        console.log('Error while calling API')
      }
    })()
  }, [])

  const setListingNumber = (number) => {
    setSelectedListingNumber(number)
  }

  return (
    <div style={{ maxHeight: '100%' }}>
      <Stack direction="row" spacing={0.1}>
        <SidePanel
          listings={listingsBackup}
          filteredListings={filteredListings}
          setFilteredListings={(newList) => setFilteredListings(newList)}
          style={{ minWidth: 380, padding: 0 }}
          selectedListingNumber={selectedListingNumber}
          setHoveredListing={(listing) => setHoveredListing(listing)}
          onTabChange={onTabChange}
          listCounts={listCounts}
        />
        <Map
          listings={listingsBackup}
          filteredListings={filteredListings}
          setSelectedListingNumber={(n) => setListingNumber(n)}
          hoveredListing={hoveredListing}
        />
      </Stack>
    </div>
  )
}

export default App;
