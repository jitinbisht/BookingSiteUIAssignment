import { Stack } from "@mui/material";
import "./CustomPagination.css";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";

const CustomPagination = (props) => {
  const numberOfListings = props.listings.length;
  return (
    <div style={{ paddingTop: 10, paddingLeft: 6, fontSize: 12 }}>
      <Stack direction={"row"} spacing={1}>
        <p style={{ width: "40%" }}>
          {`Viewing 1-${numberOfListings} of ${numberOfListings} properties.`}
        </p>
        <Stack
          direction={"row"}
          spacing={3}
          style={{
            marginTop: 5,
            marginLeft: 20,
            float: "right",
          }}
        >
          <div className="center">
            <LeftIcon fontSize="small" color="disabled" />
          </div>
          <div>
            Page {"         "}
            <input value={1} className="pagination-input" />
            {"   "} / 1
          </div>
          <div className="center">
            <RightIcon fontSize="small" color="disabled" />
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default CustomPagination;
