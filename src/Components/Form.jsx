import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi'

const Form = ({data, setData, updateDataApi, setupdateDataApi}) => {
    const[addData, setAddData] = useState({
        title:"",
        body:"",
    })
    let isEmpty = Object.keys(updateDataApi).length === 0;

    //get the updated Data and add into input field
    useEffect(()=>{
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body:updateDataApi.body || ""
        })
    },[updateDataApi])

    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value
        setAddData((prev)=>{
            return{
                ...prev, [name]:value,
            }
        })
    }

    const addPostData =async ()=>{
        const res = await postData(addData)
        console.log("res", res)
        if((res.status === 201)){
            setData([...data, res.data])
            setAddData({title:"", body:""})
        }
    }
 
    //updatePostData
    const updatePostData=async()=>{
        try {
            const res = await updateData(updateDataApi.id, addData)
            console.log(res)
            setData((prev)=>{
                return prev.map((curElem)=>{
                    return curElem.id === res.data.id ? res.data : curElem
                })
            })
            setAddData({title:"", body:""})
            setupdateDataApi({})
        } catch (error) {
            console.log(error)
            
        }

    }

    //form submission
    const handleFormSubmit=(e)=>{
        e.preventDefault()
        const action = e.nativeEvent.submitter.value;
        if(action === "ADD"){
            addPostData()
        }else if(action ==='Edit'){
            updatePostData()
        }
    }

  return (

        <form className='flex justify-center gap-2' onSubmit={handleFormSubmit}>
        <label htmlFor="title"></label>
        <input type="text" autoComplete='off' id='title' name='title' placeholder='Add Tile' value={addData.title} onChange={handleInputChange} className='border border-black pl-1.5 rounded'/>

        <label htmlFor="body"></label>
        <input type="text" autoComplete='off' id='body' name='body' placeholder='Add Post' value={addData.body} onChange={handleInputChange} className='border border-black pl-1.5 rounded' />

        <button type='submit' value={isEmpty ? "ADD" : "Edit"} className='bg-green-600 h-9 w-22 text-white font-bold font-serif cursor-pointer hover:bg-green-800 rounded'>{isEmpty ? "ADD" : "Edit"}</button>
    </form>

  )
}

export default Form
