import React from "react";
import Close from "@mui/icons-material/Close";
import MinMaxFilter from "./min-max-filters/MinMaxFilter";
import "./FiltersPanel.css";
import { Checkbox, Chip, Stack } from "@mui/material";
import { Rate } from "antd";


const FiltersPanel = (props) => {
  const [reset, setReset] = React.useState(0); // this we will use for refreshing the MinMaxFilter component after resetting the filters
  const [applyFilters, setApplyFilters] = React.useState(0); // to be updated when apply filters button gets clicked
  const [reviewsCheckboxObj, setReviewsCheckboxObj] = React.useState({
    five: false,
    four: false,
    zero: false,
  });
  const [checkbox5, setCheckbox5] = React.useState(false);
  const [checkbox4, setCheckbox4] = React.useState(false);
  const [checkbox0, setCheckbox0] = React.useState(false);

  const handleReviewCheckboxSelect = (isChecked, selectedRating) => {
    switch (selectedRating) {
      case 5:
        reviewsCheckboxObj.five = isChecked;
        setReviewsCheckboxObj(reviewsCheckboxObj);
        break;
      case 4:
        reviewsCheckboxObj.four = isChecked;
        setReviewsCheckboxObj(reviewsCheckboxObj);
        break;
      case 0:
        reviewsCheckboxObj.zero = isChecked;
        setReviewsCheckboxObj(reviewsCheckboxObj);
        break;
      default:
        console.log("No Ratings Matched!");
    }

    if (reviewsCheckboxObj.five) {
      props.setFiltersObject({...props.filtersObject, minStars: 5});
    } else if (reviewsCheckboxObj.four) {
      props.setFiltersObject({...props.filtersObject, minStars: 4});
    } else {
      props.setFiltersObject({...props.filtersObject, minStars: 0});
    }
  };

  return (
    <div className="filters-panel-container">
      <Close
        style={{ float: "right", marginRight: 5, marginBottom: 10 }}
        onClick={(e) => {
          props.setFiltersPanelOpen(false);
        }}
        htmlColor="#878787"
      />
      <MinMaxFilter
        categoryTitle="Bedrooms"
        minValue={0}
        maxValue={5}
        reset={reset}
        applyFilters={applyFilters}
        filtersObject={props.filtersObject}
        setFiltersObject={(obj) => props.setFiltersObject(obj)}
        setSearchText={(text) => {
          props.setSearchText(text);
        }}
      />
      <MinMaxFilter
        categoryTitle="Bathrooms"
        minValue={0}
        maxValue={5}
        reset={reset}
        applyFilters={applyFilters}
        filtersObject={props.filtersObject}
        setFiltersObject={(obj) => props.setFiltersObject(obj)}
        setSearchText={(text) => {
          props.setSearchText(text);
        }}
      />
      <MinMaxFilter
        categoryTitle="Sleeps"
        minValue={1}
        maxValue={20}
        reset={reset}
        applyFilters={applyFilters}
        filtersObject={props.filtersObject}
        setFiltersObject={(obj) => props.setFiltersObject(obj)}
        setSearchText={(text) => {
          props.setSearchText(text);
        }}
      />
      {/* Property reviews div */}
      <div style={{ marginTop: 15 }}>
        <div className="title-text">Property reviews</div>
        <Stack direction={"row"} spacing={1}>
          <Checkbox
            id="checkbox-5-stars"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 17 } }}
            onChange={(e) => {
              setCheckbox5(e.target.checked);
              handleReviewCheckboxSelect(e.target.checked, 5);
            }}
            checked={checkbox5}
          />
          <Rate
            disabled
            allowHalf
            defaultValue={5}
            style={{ color: "black", fontSize: 12, marginTop: 9 }}
          />
          <p style={{ color: "#727272", fontSize: 12, marginTop: 10 }}>
            5+ stars
          </p>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Checkbox
            id="checkbox-4-stars"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 17 } }}
            onChange={(e) => {
              setCheckbox4(e.target.checked);
              handleReviewCheckboxSelect(e.target.checked, 4);
            }}
            checked={checkbox4}
          />
          <Rate
            disabled
            allowHalf
            defaultValue={4}
            style={{ color: "black", fontSize: 12, marginTop: 9 }}
          />
          <p style={{ color: "#727272", fontSize: 12, marginTop: 10 }}>
            4+ stars
          </p>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Checkbox
            id="checkbox-0-stars"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 17 } }}
            onChange={(e) => {
              setCheckbox0(e.target.checked);
              handleReviewCheckboxSelect(e.target.checked, 0);
            }}
            checked={checkbox0}
          />
          <Rate
            disabled
            allowHalf
            defaultValue={0}
            style={{ color: "black", fontSize: 12, marginTop: 9 }}
          />
          <p style={{ color: "#727272", fontSize: 12, marginTop: 10 }}>
            0+ stars
          </p>
        </Stack>
      </div>

      <Stack
        direction={"row"}
        spacing={1}
        className="reset-apply-buttons-container"
      >
        <Chip
          label="Reset"
          color="primary"
          variant="outlined"
          sx={{ padding: 1 }}
          clickable={true}
          onClick={() => {
            setCheckbox5(false);
            setCheckbox4(false);
            setCheckbox0(false);
            handleReviewCheckboxSelect(false, 5);
            handleReviewCheckboxSelect(false, 4);
            handleReviewCheckboxSelect(false, 0);
            setReset(reset => reset + 1);
          }}
        />
        <Chip
          label="Apply"
          color="primary"
          sx={{ padding: 1 }}
          clickable={true}
          onClick={() => {
            setApplyFilters(applyFilters => applyFilters + 1);
            props.setFiltersObject(props.filtersObject);
          }}
        />
      </Stack>
    </div>
  );
};

export default FiltersPanel;
