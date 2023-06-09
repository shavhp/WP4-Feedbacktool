import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SurveyDetail = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/survey/${id}/`);
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    fetchSurvey();
  }, [id]);

  if (!survey) {
    return <div>Loading survey...</div>;
  }

  const { admin } = survey;

  return (
    <div>
      <h1>Detail Page</h1>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <p>Administrator: {admin ? `${admin.first_name} ${admin.last_name}` : 'N/A'}</p>
      <p>Is Anonymous: {survey.is_anonymous ? 'Yes' : 'No'}</p>
      <p>Date Sent: {survey.date_sent}</p>

      <h2>Open Questions:</h2>
      <ul>
        {survey.open_q.map((question) => (
          <li key={question.question_id}>
            {question.question_text}
          </li>
        ))}
      </ul>

      <h2>Multiple Choice Questions:</h2>
      <ul>
        {survey.mc_q.map((question) => (
          <li key={question.mc_id}>
            {question.question_text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyDetail;