import React, { useEffect, useState } from "react";
import { API_URL_SURVEYS } from "../../constants";

function Forms() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch survey data from the backend API endpoint
    fetch(API_URL_SURVEYS)
      .then((response) => response.json())
      .then((data) => setSurveys(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Forms Maken</h1>
      <h2>Survey List:</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.survey_id}>
            {survey.title} - {survey.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forms;
