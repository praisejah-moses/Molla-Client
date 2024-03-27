'use client'
import Image from "next/image";
import { useState } from "react"
import  useSWR  from "swr"

export default function Products() {

  const [isOpen,setIsOpen] = useState(false)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  
  const [image,setImage] = useState(null)
  const [fileName,setFileName] = useState('No Selected File')



  const Upload = async()=>{
      const response = await fetch('http://localhost:8000/add/products',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name:name,type:category,description:description,price:price})
      })
      return response.json()
  }

  const fetcher = (...arg) => fetch(...arg).then(res=>res.json())

  const {data,error, isLoading } = useSWR('http://localhost:8000/get/products',fetcher)

  return (
    <main className=" mt-2 p-6 w-full">
      <div className="flex justify-between items-center pb-2 border-b-2	mb-10" >
        <div className=" flex flex-col w-fit">
          <h1 className="text-3xl font-bold" >Products <span>({data && data.product.length ||'-' })</span> </h1>
          <span className=" text-slate-500" >Manage products in store</span>
        </div>

        <button className="px-[16px] py-[8px] bg-black text-slate-100 rounded" onClick={()=>{setIsOpen(!isOpen)}} >{isOpen && 'Cancel' || '+ Add New'}</button>
      </div>
      <div className={isOpen? "mb-10 border-[1px] w-full p-4 visible":'hidden'}>
          <h3 className="flex flex-col" >Add a new product <span className=" text-[12px] text-slate-500" >Create a new listing for a product</span></h3>
          <div className="mt-4 flex justify-between p-2 ">
            <div className="flex flex-col p-4 border-[1px] rounded add space-y-6" >
              <div>
                <span>Product Name</span>
                <input className="px-[12px] py-[8px] rounded border-[1px]" type="text" onChange={(event)=>{setName(event.currentTarget.value)}}/>  
              </div>
              
              <div>
                <span>Category</span>
                <select className="border-[1px] rounded px-[12px] py-[8px]" onChange={(event)=>{setCategory(event.currentTarget.value)}}  name="" id="">
                  <option value="">None</option>
                  <option value="laptops">Laptops</option>
                  <option value="phones">Phones</option>
                  <option value="tablets">Tablets</option>
                  <option value="accesories">Accesories</option>
                  <option value="watches">Watches</option>
                  <option value="bags">Bags</option>
                </select>
                {/* <input className="px-[12px] py-[8px] rounded border-[1px]" type="text" onChange={(event)=>{setCategory(event.currentTarget.value)}}/>   */}
              </div>
              <div>
                <span>Description</span>
                <textarea name="" id="" className="rounded border-[1px]" onChange={(event)=>{setDescription(event.currentTarget.value)}}  rows="4"></textarea>
              </div>
              <div>
                <span>Price per unit</span>
                <input className="px-[12px] py-[8px] rounded border-[1px]" type="text" onChange={(event)=>{setPrice(event.currentTarget.value)}}/>  
              </div>
            </div>
            
            <div className="p-4 h-fit border-[1px] space-y-2 rounded">
              <h1>Add Image</h1>
              <div className="w-[300px] h-[200px] flex flex-col items-center justify-evenly border-[2px] bg-[#EBF3E8] duration-[0.5s] hover:bg-[#E1F0DA] border-[#89CFF3] text-center rounded  border-dashed" onClick={()=>{ document.querySelector('#Upload').click()}}>
                <Image src={'/upload.png'} width={50} height={50} alt="upload" />
                <p className="mb-3 justify-self-end" >Click <span className=" text-cyan-600" >here</span> to upload images</p>
                <input type="file" className="hidden" onChange={(event)=>{ if(event.target.files[0]){return setFileName(event.target.files[0].name)};setFileName('No file selected') }}  id="Upload"/>
              </div>
             <p className="" >{fileName}</p>
            </div>
            


            <button className="px-[16px] h-[50px] py-[8px] bg-black text-slate-100 rounded" onClick={async()=>{ const res = await Upload();alert(res.message)}} >Create</button>
          </div>
        </div>
      <input className="px-[12px] py-[8px] rounded border-[1px]" type="search" name="Search" id="" placeholder="Search" />
      <table className=" mt-6 w-full text-left text-slate-500 border-[1px] border-slate-200" >
        <thead>
          <tr>
            <th className="w-[50%]" >Name</th>
            <th>Quantity</th>
            <th>Price (₦) </th>
          </tr>
         </thead>
         <tbody>
          {data? 
            (data.product.map((foo)=>{
              return(
              <tr key={foo.name}>
                <td>{foo.name}</td>
                <td>{foo.quantity.toString()}</td>
                <td>{foo.price}</td>
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
