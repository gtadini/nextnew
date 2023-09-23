"use client"

import { Antic_Slab } from "next/font/google";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function NewPage({params}) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (params.id) {
            fetch(`/api/tasks/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title)
            setDescription(data.description)
        }) 
        }
    }, [])

    const onSubmit = async (e) => {
    e.preventDefault()

    if (params.id) {
        const res = await fetch(`/api/tasks/${params.id}`,{
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        console.log(data)
    } else {
        const res = await fetch('api/tasks', { 
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-type': 'application/json'
        },
    });
        const data = await res.json()
    }
    router.refresh()
    router.push('/')
    }   
    return(
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
            onSubmit={onSubmit}>
                <label htmlFor="title" className="font-bold text-sm">
                    Título de la tarea
                </label>
                <input type="text"
                id="title"
                className="border border-gray-400 p-2 mb-4 w-full text-black"
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
                
                <label htmlFor="description" className="font-bold text-sm">
                    Descripción de mi tarea
                </label>
                <textarea rows="3"
                id="description"
                className="border border-gray-400 p-2 mb-4 w-full text-black "
                placeholder="Describe la tarea"
                onChange={(e) => setDescription(e.target.value)}      
                value={description}
                ></textarea>
                <div className="flex justify-between">
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear
                </button>
                {params.id && (
                <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () =>{
                    const res = await fetch(`/api/tasks/${params.id}`,{
                    method: "DELETE",
                    })
                const data = await res.json()
                router.refresh()
                router.push("/")
                }}
                >
                    Delete
                </button>
                )}
                </div>
            </form>
      </div>
    )

}

export default NewPage;