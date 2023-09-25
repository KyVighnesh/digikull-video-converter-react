import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState,useEffect } from 'react';
import fileDownload from 'js-file-download';



function App() {

  const [file,setFile]=useState("");

  const[converted,setConverted] = useState("")

  const [loading,setLoading] = useState()

 

  const handleFileChange=(event)=>{

    setFile(event.target.files[0])

  }
    



  const videoUpload = () => {
    let formData=new FormData();
    formData.append("file",file)
    console.log(file)

    setLoading(true)

    // we have to send it to our api

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
      }

      axios.post("https://digikull-video-converter-node.onrender.com/upload",formData,config).then(data=> {
        console.log(data)

        
      
        

        if(data) {
          setLoading(false)
        }
      }).catch(err => {{
        if(err) {
          alert("File Not Supported")
        }
        console.log(err)  
      }})

      

  }

  

  

  return (
    <div className="App">
      <h3>Video to Audio Converter Online</h3>

      <input type="file" onChange={handleFileChange}/>
      <div>
        <br/>
        <br/>
      <button onClick={videoUpload}> Convert </button>
      </div>

      <br/>
        <br/>
      
      <div>
        {
          loading?"processing.....":""
        }

        {
          loading == false?
          <a>
          <button onClick={()=> {
            axios.get("https://digikull-video-converter-node.onrender.com/converted",{responseType:'blob'}).then(res=> {
              console.log(res)

              fileDownload(res.data,"converted.mp3")

              axios.put("https://digikull-video-converter-node.onrender.com/unlink").then(res=> {
                console.log(res)
              })

            })
          }}>Download Audio</button>
</a>
        :""
        }


      </div>

      
    </div>
  );
}


export default App;
