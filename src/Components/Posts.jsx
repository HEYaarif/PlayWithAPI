import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi'
import Form from './Form'

const Posts = () => {
    const[data, setData] = useState([])
    const[updateDataApi, setupdateDataApi] = useState({})

    const getPostData=async()=>{
        const res = await getPost()
        console.log(res.data)
        setData(res.data)
      }

      useEffect(()=>{
        getPostData()
      },[])

    const handleDeletePost=async(id)=>{
        try {
            const res = await deletePost(id)
            if(res.status === 200){
                const newUpdatedPosts = data.filter((curDelete)=>{
                    return curDelete.id !== id
                })
                setData(newUpdatedPosts);
            }else{
                console.log("Failed to delete the post:", res.status)
            }
        } catch (error) {
            console.log(error) 
        }
    }

    const handleUpdatePost=(curElem)=>{
      setupdateDataApi(curElem)
    }

  return (
    <div className='mt-6'>
    <section className=''>
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setupdateDataApi={setupdateDataApi}/>
    </section>

    <div className='mt-4'>
      {/* <h1 className='text-center text-blue-500 font-bold font-serif text-3xl'>Let's Play with API</h1> */}
      <ol className='flex justify-center items-center flex-wrap gap-3'>
        {
            data.map((curElem)=>{
                const {id, body, title} = curElem
                return(
                    <li key={id} className=' w-115 h-68 p-2 shadow-xl'>
                        <p>{id}</p>
                        <p className='p-1.5'>{title}</p>
                        <p className='p-1'>{body}</p>
                        <button className='h-8 w-18 bg-blue-600 text-white m-2 cursor-pointer hover:bg-blue-800 rounded' onClick={()=>handleUpdatePost(curElem)}>Edit</button>
                        <button className='h-8 w-18 bg-rose-600 text-white cursor-pointer hover:bg-rose-800 rounded' onClick={()=> handleDeletePost(id)}>Delete</button>
                    </li>
                )
            })
        }
      </ol>
    </div>
    </div>
  )
}

export default Posts
