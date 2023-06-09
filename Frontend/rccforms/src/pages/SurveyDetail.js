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
    <div className="container w-75 mt-5">
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <p>Administrator: {admin ? `${admin.first_name} ${admin.last_name}` : 'N/A'}</p>
      <p>Is Anonymous: {survey.is_anonymous ? 'Yes' : 'No'}</p>
      <p>Date Sent: {survey.date_sent}</p>

      <form>
        <h3>Open Questions:</h3>
        <ul className="list-unstyled">
          {survey.open_q.map((question) => (
            <li key={question.question_id} className="mb-3">
              {question.question_text}
              <input type="text" className="form-control" />
              <hr />
            </li>
          ))}
        </ul>

        <h3>Multiple Choice Questions:</h3>
        <ul className="list-unstyled">
          {survey.mc_q.map((question) => (
            <li key={question.mc_id} className="mb-3">
              {question.question_text}
              <div className="form-check">
                <input type="radio" className="form-check-input" name={`mcQuestion_${question.mc_id}`} />
                <label className="form-check-label">Option A</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name={`mcQuestion_${question.mc_id}`} />
                <label className="form-check-label">Option B</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name={`mcQuestion_${question.mc_id}`} />
                <label className="form-check-label">Option C</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name={`mcQuestion_${question.mc_id}`} />
                <label className="form-check-label">Option D</label>
              </div>
              <hr/>
            </li>
          ))}
        </ul>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SurveyDetail;