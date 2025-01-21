export function controlRequestToRobot(values) {
  const apiKey = "UFVKQ0NLL4CE8N5K";

  // Construct the URL
  const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${values.status}&field2=${values.rebootState}`;

  // Helper function to handle the fetch and retry logic
  const fetchData = () => {
    return fetch(url)
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // console.log(`Update successful: ${data}`);

        // If the response data is 0, retry the fetch
        if (data === 0) {
        //   console.log("Data is 0, retrying...");
          return fetchData(); // Recursively call fetchData() to retry
        }

        return data; // Return the data so it can be used by the caller
      })
      .catch((error) => {
        console.error("Error updating ThingSpeak:", error);
        throw error; // Rethrow the error so it can be caught by the caller
      });
  };

  // Call the fetchData function to initiate the fetch request
  return fetchData();
}
