import { Stack } from "@mui/material";
import React from "react";
import CustomPagination from "./custom-pagination/CustomPagination";
import FilterInputs from "./filter-inputs/FilterInputs";
import FiltersPanel from "./filters-panel/FiltersPanel";
import "./SidePanel.css";
import TabsContainer from "./tabs-container/TabsContainer";

const SidePanel = (props) => {

  const [searchText, setSearchText] = React.useState("");
  const defaultFiltersObject = {
    minBedrooms: 0,
    maxBedrooms: 5,
    minBathrooms: 0,
    maxBathrooms: 5,
    minSleeps: 1,
    maxSleeps: 20,
    minStars: 0,
  };
  const [filtersObject, setFiltersObject] =
    React.useState(defaultFiltersObject);
  const [filtersPanelOpen, setFiltersPanelOpen] = React.useState(false);

  return (
    <Stack direction={"row"}>
      <div className="sidepanel-container">
        <div className="filter-inputs">
          <FilterInputs
            {...props}
            searchText={searchText}
            setSearchText={(text) => {
              setSearchText(text);
            }}
            setFiltersPanelOpen={(value) => {
              setFiltersPanelOpen(value);
            }}
          />
        </div>
        <TabsContainer
          {...props}
          searchText={searchText}
          filtersObject={filtersObject}
        />
        <CustomPagination {...props} />
      </div>
      {filtersPanelOpen ? (
        <FiltersPanel
          setFiltersPanelOpen={(value) => {
            setFiltersPanelOpen(value);
          }}
          setSearchText={(text) => {
            setSearchText(text);
          }}
          filtersObject={filtersObject}
          setFiltersObject={(obj) => setFiltersObject({ ...obj })}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default SidePanel;
