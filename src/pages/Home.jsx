import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../config/firebase/firebaseconfig';

const Home = () => {
    const todoInput = useRef();

    const [todo,setTodo]= useState([]);

    useEffect(() =>{
        const getDataFromFirestore = async () =>{
            const q = query(collection(db,"todo"), where("uid","==",auth.currentUser.uid), orderBy("date"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) =>{     
                console.log(doc.data());
                
                todo.push({
                    ...doc.data(),
                    docid: doc.id
                })
                setTodo([...todo])
            });
            
        }
        getDataFromFirestore()
    },[])
    const addTodo = async(event) => {
        event.preventDefault()
        console.log(todoInput.current.value)

        try{
            const docRef = await addDoc(collection(db,"todo"),{
                title: todoInput.current.value,
                uid: auth.currentUser.uid,
                date: Timestamp.fromDate(new Date()),
            });
            
            console.log("Document written with ID:",docRef.id);
            todo.push({
                title:todoInput.current.value,
                uid:auth.currentUser.uid,
                docid:docRef.id
            })
            setTodo([...todo])
         } catch (e){
            console.error("Error adding document:", e);

            }
        }

        const deleteTodo = async (item, index) => {
            console.log(item)
            await deleteDoc(doc(db, "todo", item.docid));
            todo.splice(index, 1);
            setTodo([...todo]);
            console.log('data deleted')
          }

          const editTodo = async (item , index) => {
            const updatedVal = prompt('enter updated val');
            const washingtonRef = doc(db, "todo", item.docid);
        
            await updateDoc(washingtonRef, {
              title: updatedVal
            });
            todo[index].title = updatedVal;
            setTodo([...todo]);
            console.log('todo updated')
        
        }    
    
  return (
    <>
    <h1>Todo App</h1>
    <form onSubmit={addTodo}>
        <input type='text'placeholder='enter todo' ref={todoInput}/>
        <button type='submit'>Add Todo</button>
    </form>
    <ol>
        {todo.length > 0 ? todo.map((item,index)=>{
            return<li key={item.docid}>{item.title}
            <button onClick={()=> deleteTodo(item,index)}>delete</button>
            <button onClick={()=> editTodo(item,index)}>edit</button>
            </li>
        }): <h1>NO data found...</h1>}
        
    </ol>
    </>
  )
}


export default Home