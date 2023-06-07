import React, { useEffect, useState } from "react";
import { API_URL_SURVEYS, API_URL_OPEN_Q, API_URL_MC_Q } from "../../constants";
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
    date_sent: ""
  });
  const [openQuestions, setOpenQuestions] = useState([]);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);

  useEffect(() => {
    fetchSurveysData();
    fetchOpenQuestions();
    fetchMultipleChoiceQuestions();
  }, []);

  const handleSurveyClick = (surveyId) => {
    if (expandedSurvey && expandedSurvey.survey_id === surveyId) {
      setExpandedSurvey(null);
    } else {
      const survey = surveys.find((survey) => survey.survey_id === surveyId);
      setExpandedSurvey(survey);
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
          date_sent: ""
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

  const fetchOpenQuestions = async () => {
    try {
      const response = await fetch(API_URL_OPEN_Q);
      if (response.ok) {
        const data = await response.json();
        setOpenQuestions(data);
      } else {
        console.error("Failed to fetch open questions");
      }
    } catch (error) {
      console.error("Fetch open questions error:", error);
    }
  };

  const fetchMultipleChoiceQuestions = async () => {
    try {
      const response = await fetch(API_URL_MC_Q);
      if (response.ok) {
        const data = await response.json();
        setMultipleChoiceQuestions(data);
      } else {
        console.error("Failed to fetch multiple-choice questions");
      }
    } catch (error) {
      console.error("Fetch multiple-choice questions error:", error);
    }
  };

const handleDeleteClick = async (surveyId) => {
  try {
    const response = await fetch(`${API_URL_SURVEYS}${surveyId}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchSurveysData();
    } else {
      console.error("Failed to delete form");
    }
  } catch (error) {
    console.error("Delete form error:", error);
  }
};


  return (
    <div className="forms-container">
      <h1 className="forms-title">Vragenlijsten</h1>
      {surveys.map((survey) => (
        <div className="survey-card" key={survey.survey_id}>
          <h3 onClick={() => handleSurveyClick(survey.survey_id)}>{survey.title}</h3>
          {expandedSurvey && expandedSurvey.survey_id === survey.survey_id && (
            <>
              <p className="survey-info">Survey ID: {survey.survey_id}</p>
              <p className="survey-info">Admin: {survey.admin}</p>
              <p className="survey-info">Is Anonymous: {survey.is_anonymous ? "Yes" : "No"}</p>
              <p className="survey-info">Date Sent: {survey.date_sent}</p>
              <p className="survey-info">Open Questions:</p>
              <p className="survey-info">Multiple Choice Questions:</p>
              <button onClick={() => handleDeleteClick(survey.survey_id)}>Verwijderen</button>
            </>
          )}
        </div>
      ))}
      {showForm && (
        <div className="form-popup">
          <h3>Vragenlijst maken</h3>
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

            <label htmlFor="anonymous-checkbox">Anoniem:</label>
            <input
              type="checkbox"
              id="anonymous-checkbox"
              name="is_anonymous"
              checked={formData.is_anonymous}
              onChange={handleInputChange}
            />

            <label htmlFor="date-sent-input">Verstuurd op:</label>
            <input
              type="date"
              id="date-sent-input"
              name="date_sent"
              value={formData.date_sent}
              onChange={handleInputChange}
            />

            <label htmlFor="open-questions-select">Selecteer open vragen:</label>
            <select
              id="open-questions-select"
              name="questions"
              multiple
              value={formData.questions}
              onChange={handleInputChange}
            >
              {openQuestions.map((question) => (
                <option key={question.question_id} value={question.question_id}>
                  {question.question_text}
                </option>
              ))}
            </select>

            <label htmlFor="multiple-choice-select">Selecteer meerkeuzevragen:</label>
            <select
              id="multiple-choice-select"
              name="multiple_choice"
              multiple
              value={formData.multiple_choice}
              onChange={handleInputChange}
            >
              {multipleChoiceQuestions.map((question) => (
                <option key={question.mc_id} value={question.mc_id}>
                  {question.question_text}
                </option>
              ))}
            </select>

            <button type="submit">Aanmaken</button>
          </form>
        </div>
      )}
      {!showForm && <button onClick={handleAddClick}>Nieuwe vragenlijst</button>}
    </div>
  );
}

export default Forms;
