import React, { useEffect, useState } from "react";
import { API_URL_SURVEYS, API_URL_QUESTIONS } from "../../constants";
import "./Forms.css";

function Forms() {
  const [surveys, setSurveys] = useState([]);
  const [expandedSurvey, setExpandedSurvey] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    questions: [],
    multiple_choice: [],
    url: "",
    is_anonymous: false,
    date_sent: "" // Add the date_sent field
  });
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    fetchSurveysData();
    fetchAllQuestions();
  }, []);

  const handleSurveyClick = (surveyId) => {
    if (expandedSurvey === surveyId) {
      setExpandedSurvey(null);
    } else {
      setExpandedSurvey(surveyId);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL_SURVEYS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          questions: [],
          multiple_choice: [],
          url: "",
          is_anonymous: false,
          date_sent: "" // Reset the date_sent field
        });
        setShowForm(false);
        fetchSurveysData();
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, options } = event.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "questions" || name === "multiple_choice") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fetchSurveysData = async () => {
    try {
      const response = await fetch(API_URL_SURVEYS);
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
      } else {
        console.error("Failed to fetch surveys");
      }
    } catch (error) {
      console.error("Fetch surveys error:", error);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch(API_URL_QUESTIONS);
      if (response.ok) {
        const data = await response.json();
        setAllQuestions(data);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Fetch questions error:", error);
    }
  };

  const handleDelete = async (surveyId) => {
    try {
      const response = await fetch(`${API_URL_SURVEYS}${surveyId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSurveysData();
      } else {
        console.error("Form deletion failed");
      }
    } catch (error) {
      console.error("Form deletion error:", error);
    }
  };

  return (
    <div className="forms-container">
      <h1 className="forms-title">Forms</h1>
      <h2 className="forms-subtitle">All Forms:</h2>
      {surveys.map((survey) => (
        <div className="survey-card" key={survey.survey_id}>
          <h3 onClick={() => handleSurveyClick(survey.survey_id)}>{survey.title}</h3>
          {expandedSurvey === survey.survey_id && (
            <>
              <p className="survey-info">Survey ID: {survey.survey_id}</p>
              <p className="survey-info">Admin: {survey.admin}</p>
              <p className="survey-info">Is Anonymous: {survey.is_anonymous ? "Yes" : "No"}</p>
              <p className="survey-info">Date Sent: {survey.date_sent}</p>
              <p className="survey-info">Open Questions:</p>
              <ul>
                {survey.questions
                  .filter((questionId) =>
                    allQuestions.find((q) => q.question_id === questionId)?.question_type === "OPEN"
                  )
                  .map((questionId) => {
                    const question = allQuestions.find((q) => q.question_id === questionId);
                    if (question) {
                      return <li key={question.question_id}>{question.question_text}</li>;
                    }
                    return null;
                  })}
              </ul>
              <p className="survey-info">Multiple Choice Questions:</p>
              <ul>
                {survey.multiple_choice
                  .filter((mcQuestionId) =>
                    allQuestions.find((q) => q.question_id === mcQuestionId)?.question_type === "MC"
                  )
                  .map((mcQuestionId) => {
                    const mcQuestion = allQuestions.find((q) => q.question_id === mcQuestionId);
                    if (mcQuestion) {
                      return <li key={mcQuestion.question_id}>{mcQuestion.question_text}</li>;
                    }
                    return null;
                  })}
              </ul>
              <button onClick={() => handleDelete(survey.survey_id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {showForm && (
        <div className="form-popup">
          <h3>Create Form</h3>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title-input">Title:</label>
            <input
              type="text"
              id="title-input"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />

            <label htmlFor="url-input">URL:</label>
            <input
              type="text"
              id="url-input"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />

            <label htmlFor="anonymous-checkbox">Is Anonymous:</label>
            <input
              type="checkbox"
              id="anonymous-checkbox"
              name="is_anonymous"
              checked={formData.is_anonymous}
              onChange={handleInputChange}
            />

            <label htmlFor="date-sent-input">Date Sent:</label>
            <input
              type="date"
              id="date-sent-input"
              name="date_sent"
              value={formData.date_sent}
              onChange={handleInputChange}
            />

            <label htmlFor="questions-select">Select Open Questions:</label>
            <select
              id="questions-select"
              name="questions"
              multiple
              value={formData.questions}
              onChange={handleInputChange}
            >
              {allQuestions.map((question) =>
                question.question_type === "OPEN" ? (
                  <option key={question.question_id} value={question.question_id}>
                    {question.question_text}
                  </option>
                ) : null
              )}
            </select>

            <label htmlFor="multiple-choice-select">Select Multiple Choice Questions:</label>
            <select
              id="multiple-choice-select"
              name="multiple_choice"
              multiple
              value={formData.multiple_choice}
              onChange={handleInputChange}
            >
              {allQuestions.map((question) =>
                question.question_type === "MC" ? (
                  <option key={question.question_id} value={question.question_id}>
                    {question.question_text}
                  </option>
                ) : null
              )}
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <button className="add-button" onClick={handleAddClick}>
        Add
      </button>
    </div>
  );
}

export default Forms;
