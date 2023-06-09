import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SurveyDetail = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const [surveyResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/survey/${id}/`)
        ]);

        var openQuestionId = surveyResponse.data.open_q;
        //var multipleQuistionId = surveyResponse.data.mc_q;

        
        
        const [openQResponse, mcQResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/openQuestions/${openQuestionId}/`),
          axios.get(`http://127.0.0.1:8000/api/multipleChoiceQuestions/${surveyResponse.data.mc_q[0]}/`),
        ]);

        const surveyData = surveyResponse.data;
        const openQData = openQResponse.data;
        const mcQData = mcQResponse.data;

        const updatedSurveyData = {
          ...surveyData,
          open_q: openQData,
          mc_q: mcQData,
        };
    
        setSurvey(updatedSurveyData);
        
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
          <li>{survey.open_q.question_text}</li>
          <input type="text" className="form-control" />
          <hr />
        </ul>

        <h3>Multiple Choice Questions:</h3>
        <ul className="list-unstyled">
          <li>{survey.mc_q.question_text}</li>
          <input type="text" className="form-control" />
          <div className="form-check">
            <input type="radio" className="form-check-input" name={`mcQuestion_${survey.mc_q.mc_id}`} value="A" />
            <label className="form-check-label">{survey.mc_q.option_a}</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name={`mcQuestion_${survey.mc_q.mc_id}`} value="B" />
            <label className="form-check-label">{survey.mc_q.option_b}</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name={`mcQuestion_${survey.mc_q.mc_id}`} value="C" />
            <label className="form-check-label">{survey.mc_q.option_c}</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name={`mcQuestion_${survey.mc_q.mc_id}`} value="D" />
            <label className="form-check-label">{survey.mc_q.option_d}</label>
          </div>
          <hr />
        </ul>


        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SurveyDetail;