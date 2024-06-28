"use client"

import {useRouter} from "next/navigation"
import {useState,React} from "react"

const Markupform = () => {

    
    const [name, setName] = useState('')
    const [email, setEmail] =useState('')
    const [url, setURL] = useState('')
    const [isLoading,setIsLoading] =useState(false) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        const formdata = {
          name,
          email,
          url,
        };
      
        try {
          const response = await fetch('./api/addMarkup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
          });
      
          if (response.ok) {
            alert('Form submitted successfully');
            setName("");
            setEmail("");
            setURL("");
          } else {
            const errorData = await response.json(); // Assuming server sends error details
            alert(`Error: ${errorData.message || 'Failed to submit form'}`);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Failed to submit form');
        } finally {
          setIsLoading(false);
        }
      };
 
  return (
    <div>
        <form className="w-1/2" onSubmit={handleSubmit}>
            <label>
                <span>Name :</span>
                <input 
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                />
            </label>
            <label>Email :
                <input 
                type="text" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}/>
            </label>
            <label>URL :
                <input 
                type="text" 
                onChange={(e) => setURL(e.target.value)} 
                value={url}
                />
            </label>
            <button 
            className="btn-primary"
            disabled={isLoading}>
                {isLoading && <span> Adding..</span>}
                {!isLoading && <span> Add Markup</span>}

            </button>
        </form>
       
    </div>

  )
}

export default Markupform