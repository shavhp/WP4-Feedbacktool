import React, { useEffect, useState } from "react";
import { API_URL_SURVEYS, API_URL_QUESTIONS, API_URL_MC_OPTIONS } from "../../constants";

function Forms() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch(API_URL_SURVEYS)
      .then((response) => response.json())
      .then(async (data) => {
        const surveysWithQuestions = await Promise.all(
          data.map(async (survey) => {
            const questionsResponse = await fetch(`${API_URL_QUESTIONS}?survey=${survey.survey_id}`);
            const questionsData = await questionsResponse.json();

            const mcOptionsResponse = await fetch(`${API_URL_MC_OPTIONS}?survey=${survey.survey_id}`);
            const mcOptionsData = await mcOptionsResponse.json();

            return {
              ...survey,
              questions: questionsData,
              multiple_choice: mcOptionsData,
            };
          })
        );
        setSurveys(surveysWithQuestions);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Forms</h1>
      <h2>Alle Forms:</h2>
      {surveys.map((survey) => (
        <div key={survey.survey_id}>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <p>Survey ID: {survey.survey_id}</p>
          <p>Admin: {survey.admin}</p>
          <p>Is Anonymous: {survey.is_anonymous ? "Yes" : "No"}</p>
          <p>Date Sent: {survey.date_sent}</p>
          <p>Open Vragen:</p>
          <ul>
            {survey.questions.map((question) => (
              <li key={question.id}>{question.question_text}</li>
            ))}
          </ul>
          <p>Meerkeuzevragen:</p>
          <ul>
            {survey.multiple_choice.map((mcQuestion) => (
              <li key={mcQuestion.id}>{mcQuestion.question_text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Forms;
