/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { Checkbox, Stack } from "@mui/material";
import { Rate } from "antd";
import "./Listings.css";

const Listing = (props) => {
  const {listings, properties, updateTabCount, setProperties} = props;
  const SELECT_ALL_PROPERTIES = 'Select all properties';
  let filteredListings = [];
  const REMOVE = 'Remove';

  const removeListing = (key, propertyId) => {
    listings.splice(key, 1);
    setProperties(properties.filter(property => property.propertyId !== propertyId))
  };

  useEffect(()=>{
    updateTabCount(properties)
  },[properties.length])

  const handleCheckBoxChange = (e) =>{
    const {name, checked} = e.target;
    if(name === 'allSelect'){
      props.setPropertiesBackup(listings.map(listing => ({
        ...listing, isChecked: checked
      })))
    } else {
      props.setPropertiesBackup(listings.map((listing) =>
        listing.propertyId === name ? { ...listing, isChecked: checked } : listing
      ));
    }
  }
  return (
    <div style={{ height: "69vh", overflowY: "scroll", overflowX: "hidden" }}>
      <div style={{ color: '#787878', marginTop: 10 }}>
        {' '}
        <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 17 } }}
          style={{ marginLeft: 4 }}
          name='allSelect'
          checked={!listings.some((listing) => listing?.isChecked !== true)}
          onChange={handleCheckBoxChange}
        />
        <span>{SELECT_ALL_PROPERTIES}</span>
      </div>
      {listings.map((listing, key) => {
        if (
          props.searchText.length === 0 ||
          listing?.propertyId
            ?.toLowerCase()
            .includes(props.searchText.toLowerCase()) ||
          listing?.propertyMetadata?.headline
            .toLowerCase()
            ?.includes(props.searchText.toLowerCase())
        ) {
          if (
            listing.averageRating >= props.filtersObject.minStars &&
            listing.bathrooms.full >= props.filtersObject.minBathrooms &&
            listing.bathrooms.full <= props.filtersObject.maxBathrooms &&
            listing.bedrooms >= props.filtersObject.minBedrooms &&
            listing.bedrooms <= props.filtersObject.maxBedrooms &&
            listing.sleeps >= props.filtersObject.minSleeps &&
            listing.sleeps <= props.filtersObject.maxSleeps
          ) {
            filteredListings.push(listing);
            return (
              <div
                style={{ padding: 2 }}
                key={listing.propertyMetadata.headline}
                onMouseEnter={() => props.setHoveredProperty(listing)}
                onMouseLeave={() => props.setHoveredProperty({})}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  className={
                    listing.propertyId === props.selectedPropertyID
                      ? "selected-listing"
                      : "listing"
                  }
                >
                  <Checkbox 
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 17 } }} 
                    checked={listing?.isChecked || false} 
                    name={listing.propertyId}
                    onChange={handleCheckBoxChange}
                    />
                  <img
                    src={listing.images[0].c6_uri}
                    className="listing-image"
                  />
                  <Stack spacing={0.001}>
                    <p
                      style={{ fontSize: 12, color: "#1ab71a", height: "7px" }}
                    >
                      76% match
                    </p>
                    <p className="listing-headline">
                      {listing.propertyMetadata.headline}
                    </p>
                    <p style={{ color: "#787878", fontSize: 10 }}>
                      {listing.bedrooms} br • {listing.bathrooms.full} ba •
                      Sleeps {listing.sleeps}
                    </p>
                    <div>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={listing.averageRating}
                        style={{ color: "black", fontSize: 10 }}
                      />
                      <span style={{ fontSize: 10 }}>
                        {" "}
                        ({listing.reviewCount})
                      </span>
                      <span
                        className="remove-label"
                        onClick={() => {
                          removeListing(key, listing.propertyId);
                        }}
                      >
                        {REMOVE}
                      </span>
                    </div>
                  </Stack>
                </Stack>
                <hr className="styled-hr" />
              </div>
            );
          }
        }
      })}
      {filteredListings.length !== props.filteredProperties.length
        ? props.setFilteredProperties([...filteredListings])
        : null}
    </div>
  );
};

export default Listing;
