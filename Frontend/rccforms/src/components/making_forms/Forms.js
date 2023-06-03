import React, { useEffect, useState } from "react";
import { API_URL_SURVEYS, API_URL_QUESTIONS } from "../../constants";
import "./Forms.css";

function Forms() {
  const [surveys, setSurveys] = useState([]);
  const [expandedSurvey, setExpandedSurvey] = useState(null);
  const [showForm, setShowForm] = useState(false); // State for form visibility
  const [formData, setFormData] = useState({
    title: "",
    questions: [],
    multiple_choice: [],
    url: "",
    is_anonymous: false,
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
        // Form submission successful
        // Reset form state
        setFormData({
          title: "",
          questions: [],
          multiple_choice: [],
          url: "",
          is_anonymous: false,
        });
        setShowForm(false);
        // Refresh the surveys data to include the newly added survey
        fetchSurveysData();
      } else {
        // Handle form submission error
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
        // Handle fetch surveys error
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
        // Handle fetch questions error
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
        // Form deletion successful
        // Refresh the surveys data to update the list
        fetchSurveysData();
      } else {
        // Handle form deletion error
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
              <p>Survey ID: {survey.survey_id}</p>
              <p>Admin: {survey.admin}</p>
              <p>Is Anonymous: {survey.is_anonymous ? "Yes" : "No"}</p>
              <p>Date Sent: {survey.date_sent}</p>
              <p>Open Questions:</p>
              <ul>
                {survey.questions.map((question) => (
                  <li key={question.question_id}>{question.question_text}</li>
                ))}
              </ul>
              <p>Multiple Choice Questions:</p>
              <ul>
                {survey.multiple_choice.map((mcQuestion) => (
                  <li key={mcQuestion.mc_id}>{mcQuestion.question}</li>
                ))}
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

            {/* Select open questions */}
            <label htmlFor="questions-select">Select Open Questions:</label>
            <select
              id="questions-select"
              name="questions"
              multiple
              value={formData.questions}
              onChange={handleInputChange}
            >
              {allQuestions.map((question) => {
                if (question.question_type === "OPEN") {
                  return (
                    <option key={question.question_id} value={question.question_id}>
                      {question.question_text}
                    </option>
                  );
                }
                return null;
              })}
            </select>

            {/* Select multiple-choice questions */}
            <label htmlFor="multiple-choice-select">Select Multiple Choice Questions:</label>
            <select
              id="multiple-choice-select"
              name="multiple_choice"
              multiple
              value={formData.multiple_choice}
              onChange={handleInputChange}
            >
              {allQuestions.map((question) => {
                if (question.question_type === "MC") {
                  return (
                    <option key={question.question_id} value={question.question_id}>
                      {question.question_text}
                    </option>
                  );
                }
                return null;
              })}
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
