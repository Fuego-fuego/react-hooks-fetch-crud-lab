import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch all questions
  useEffect(()=>{

    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => setQuestions(data))

  },[])

  // Add question to the DOM
  function handleAddQuestion (question){
    setQuestions([...questions,question])
  }

  // Delete question from the DOM
  function handleDeleteQuestion (deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)

    setQuestions(updatedQuestions);
  }

  // Update Question in the DOM
  function handleUpdateQuestion (updatedQuestion){

    const updatedQuestions = questions.map( question => { 
      if(question.id === updatedQuestion.id){
        return updatedQuestion;
      }else{
        return question;
      }
    })

    setQuestions(updatedQuestions);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion = {handleAddQuestion}/> : <QuestionList 
      onUpdateQuestion ={handleUpdateQuestion} 
      onDeleteQuestion ={handleDeleteQuestion} 
      questions ={questions} 
      setQuestions={setQuestions}/>}
    </main>
  );
}

export default App;
