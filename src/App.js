import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState,useEffect } from 'react';


function App() {

  const [file,setFile]=useState("");

  const[videoUrl,setVideoUrl] = useState("")
  
  const[converted,setConverted] = useState("")

  const [loading,setLoading] = useState(false)

  const [validFile,setValidFile] = useState(null)
 

  const handleFileChange=(event)=>{

    if(event.target.files[0] == undefined) {
      setFile(file)
      setVideoUrl(videoUrl)
    }

    else if(event.target.files[0].name.split('.')[1] == 'mp4' || event.target.files[0].name.split('.')[1] == 'webm') {

      setValidFile(true)
      setFile(event.target.files[0])
      let objUrl = URL.createObjectURL(event.target.files[0])
      setVideoUrl(objUrl)
      
    }

    else {
      setValidFile(false)
      alert('Invalid File Type')
    }


  }

  const onHandleDownload = async() => {

  
    let response = await fetch(converted)

      const blob = await response.blob()

      console.log(blob)
      
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'audio_file.mp3'; // Specify the filename for the downloaded file

      // Append anchor element to document body
      document.body.appendChild(link);

      // Trigger click event on anchor element
      link.click();

      // Remove anchor element from document body
      document.body.removeChild(link);

  }

    
  const videoUpload = () => {
    let formData=new FormData();
    formData.append("file",file)
    console.log(file)

    setLoading(true)

    // we have to send it to our api

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': 'true'
        },
      }
        
        axios.post("https://digikull-video-converter-final.onrender.com/upload",formData,config).then(res=> {

        console.log(res.data.data.Location)

          if(res) {
            setLoading(false)
            setValidFile(false)
            console.log(res)

            setConverted(res.data.data.Location)


          }
        }).catch(err => {{
          if(err) {
            alert("Unable to process request, please try again")
          }
        }})
      
     


  }

  

  

  return (
    <div className="App" style={{minHeight:window.innerHeight}}>

      <div class="card">
        
  <div class="card-info">
    <h3>Quick Convert</h3>

<div id='inner'>
      <label htmlFor='upload'>Upload Video</label>

<input type="file" onChange={handleFileChange} id='upload'/>
<div>
  <br/>
  <br/>

  {validFile && loading == false?<button onClick={videoUpload}> <span> Convert
  </span> </button>:validFile == false && loading == false?<button onClick={onHandleDownload}> <span> Download Audio
  </span> </button>:""}
  
</div>

<br/>
  <br/>

<div className='loader-container'>
  {
    loading?<ul class="wave-menu">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>:""
  }

</div>
<div>
  
<video style={{height:"200px",width:"400px"}} src = {videoUrl} controls>
</video>


</div>

</div>
  </div>
</div>
    </div>
  );
}


export default App;
