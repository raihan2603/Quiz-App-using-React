import React,{useState,useRef} from 'react';
import './Quiz.css';

import { data } from './data';
const Quiz = () => {
    let [index,setIndex]=useState(0);
    let [questions,setQuestions]=useState(data[index]);
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0);
    let [result,setResult]=useState(false);

    let option1=useRef(null);
    let option2=useRef(null);
    let option3=useRef(null);
    let option4=useRef(null);

    let option_array=[option1,option2,option3,option4];

    const checkAns=(e,ans)=>{
         if(lock === false){
            if(questions.ans === ans){
                e.target.classList.add("correct");
                    setLock(true);
                    setScore(prev=>prev+1);
            }else{
                e.target.classList.add("wrong");
                option_array[questions.ans-1].current.classList.add("correct");
                setLock(true); 
            }
         }
            
        
    }
    let next=()=>{
        if(lock === true){
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestions(data[index]);
            setLock(false);

            option_array.map((option)=>{
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })
        }
    }
    let reset=()=>{
        window.location.reload();
    }
    return (
        <div>
           <div className="container">
            <div className="content">
            <h1>Quiz</h1>
            <div className="underline"></div>
            {result?<></>:<>
                <h2>{index+1}.{questions.question}</h2>
            <ul>
                <li ref={option1} onClick={(e)=>checkAns(e,1)}>{questions.option1}</li>
                <li ref={option2} onClick={(e)=>checkAns(e,2)}>{questions.option2}</li>
                <li ref={option3} onClick={(e)=>checkAns(e,3)}>{questions.option3}</li>
                <li ref={option4} onClick={(e)=>checkAns(e,4)}>{questions.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index+1} out of {data.length}</div> 
            </>}
            {result?<><h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button></>:<></>}
             
            </div>
           </div>
        </div>
    );
};

export default Quiz;