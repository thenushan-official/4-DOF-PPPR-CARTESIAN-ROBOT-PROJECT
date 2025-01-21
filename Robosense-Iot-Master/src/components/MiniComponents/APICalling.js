import React, { useEffect, useState } from "react";
import axios from "axios";

export default function APICalling({
  setDataForIndicators,
  setKwh,
  data,
  setData,
  robotStatus,
  setRobotStatus,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API call using axios
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2808728/feeds.json?api_key=GKWNY3IU8ZC2TYT9&results=120"
        );

        const reversedData = [...response.data.feeds].reverse(); // Create a new reversed array
        // console.log(reversedData); // Console log the reversed array
        setData(reversedData);
        setRobotStatus(parseInt(String(reversedData[0].field8)[0], 10));
        setDataForIndicators([
          {
            attribute: "Voltage",
            value: reversedData[0].field2,
            lowValue: 9,
            alertValue: 14,
            warningValue: 16,
            maxValue: 20,
          },
          {
            attribute: "Current",
            value: reversedData[0].field3,
            lowValue: 0,
            alertValue: 6,
            warningValue: 10,
            maxValue: 20,
          },
          {
            attribute: "Vibration",
            value:
              reversedData[0].field5 *
              reversedData[0].field6 *
              reversedData[0].field7,
            lowValue: 0,
            alertValue: 120,
            warningValue: 150,
            maxValue: 200,
          },
          {
            attribute: "Temperature",
            value: reversedData[0].field1,
            lowValue: 0,
            alertValue: 85,
            warningValue: 90,
            maxValue: 120,
          },
        ]);
        setKwh(reversedData[0].field4); // Set the reversed array to state
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
    // onClick={() => {
    //   processField1Data(data2, 120);
    // }}
    // className=" h-10 bg-white"
    ></div>
  );
}
