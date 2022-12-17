/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from "react";
import "./Map.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { OverlayView } from "@react-google-maps/api";
import { Stack } from "@mui/material";

const Map = (props) => {
  const MAP_FAILURE = "Failed in loading the map!!";
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 48.8647,
    lng: 2.3522,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuR5af4fifSI-5IKiBuGvajDq2oKuIBpM",
    libraries: ["places", "geometry", "visualization", "drawing"],
  });

  const [zoom, setZoom] = React.useState(11)
  useEffect(() => {
      setTimeout(() => {
        setZoom(14)
      }, 300)
    }, [])

  const handleMarkerClick = (listing) => {
    props.setSelectedListingNumber(listing.listingNumber);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {props?.filteredListings?.map((listing) => {
          let position = {
            lat: listing.geoCode.latitude,
            lng: listing.geoCode.longitude,
          };
          return (
            <>
              <Marker
                position={position}
                title={listing.propertyMetadata.headline}
                onMouseOver={(e) => handleMarkerClick(listing)}
                onMouseOut={(e) => handleMarkerClick({})}
              />
              {props.hoveredListing.listingNumber === listing.listingNumber ? (
                <OverlayView
                  position={{
                    lat: listing.geoCode.latitude,
                    lng: listing.geoCode.longitude,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="marker-info-div">
                    <Stack direction={"row"} spacing={1}>
                      <img
                        src={listing.images[0].c6_uri}
                        className="info-div-image"
                      />
                      <div>
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#626262",
                            marginBottom: 4,
                          }}
                        >
                          {listing.propertyType}
                        </p>
                        <p style={{ color: "#787878", fontSize: 10 }}>
                          {listing.bedrooms} br • {listing.bathrooms.full} ba •
                          Sleeps {listing.sleeps}
                        </p>
                        <p className="remove-label">Remove</p>
                      </div>
                    </Stack>
                  </div>
                </OverlayView>
              ) : (
                <span />
              )}
            </>
          );
        })}
      </GoogleMap>
    </>
  ) : (
    <>{MAP_FAILURE}</>
  );
};

export default Map;
