import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;


  // Deleted Question from server and update in the DOM
    function handleDeleteQuestionClick (){

      fetch(`http://localhost:4000/questions/${id}`,{

      method:'DELETE'
      })
      .then(resp => resp.json())
      .then(() => onDeleteQuestion(question))
      
    }

// Update the correct answer

    function handleCorrectAnswerChange (e){
      fetch(`http://localhost:4000/questions/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(
          {
            "correctIndex":e.target.value
          }
        )
      })
      .then(resp => resp.json())
      .then((updatedItem)=> onUpdateQuestion(updatedItem))
    
    }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestionClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
