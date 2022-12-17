export default async function getFilteredListings(requestObject) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(requestObject);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:4000/fetchData",
      requestOptions
    );

    if (!response.ok) {
      throw response;
    }
    const json_response = await response.json();
    return json_response;
  } catch (err) {
    console.log("Error while calling getFilteredListings service!");
  }
}
