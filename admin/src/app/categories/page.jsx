'use client'
import { useState } from "react"
import  useSWR  from "swr"

export default function Categories() {

  const [isOpen,setIsOpen] = useState(false)
  const [foo, setFoo] = useState('');
  const fetcher = (...arg) => fetch(...arg).then(res=>res.json())
  

  const Upload = async()=>{
      const response = await fetch('http://localhost:8000/add/categories',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({categoryname:foo})
      })
      return response.json()
  }


  const {data,error, isLoading } = useSWR('http://localhost:8000/get/categories',fetcher)
  

  return (
    <main className=" mt-2 p-6 w-full">
      <div className="flex justify-between items-center pb-2 border-b-2	mb-10" >
        <div className=" flex flex-col w-fit">
          <h1 className="text-3xl font-bold" >Categories <span>({data && data.categories.length ||'-' })</span> </h1>
          <span className=" text-slate-500" >Manage store categories</span>
        </div>

        <button className="px-[16px] py-[8px] bg-black text-slate-100 rounded" onClick={()=>{setIsOpen(!isOpen)}} >{isOpen && 'Cancel' || '+ Add New'}</button>
      </div>

      <div className={isOpen? "mb-10 border-[1px] w-full p-4 visible":'hidden'}>
          <h3 className="flex flex-col" >New Category <span className=" text-[12px] text-slate-500" >Create a new category</span></h3>
          <div className="mt-4 flex justify-between p-2 ">
            <input className="px-[12px] py-[8px] rounded border-[1px]" type="text" onChange={(event)=>{setFoo(event.currentTarget.value)}}  placeholder="Category Name" />
            <button className="px-[16px] py-[8px] bg-black text-slate-100 rounded" onClick={async()=>{ const res = await Upload();alert(res.message)}} >Create</button>
          </div>
      </div>

      <input className="px-[12px] py-[8px] rounded border-[1px]" type="search" name="Search" id="" placeholder="Search" />
      <table className=" mt-6 w-full text-left text-slate-500 border-[1px] border-slate-200" >
        <thead>
          <tr>
            <th className="w-[50%]" >Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
         </thead>
         <tbody>
          {data? 
            (data.categories.map((foo)=>{
              return(
              <tr key={foo.categoryname}>
                <td>{foo.categoryname}</td>
                <td>{foo.active.toString()}</td>
                <td>{foo.created}</td>
              </tr>)
          })
            )
          :  
          <tr>
            <td className=" align-middle text-center p-10" colSpan={3} >No Result.</td>
          </tr>
          }
         </tbody>
      </table>
  
      
    </main>
  );
}
