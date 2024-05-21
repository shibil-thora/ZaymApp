import React from 'react'
import { useState } from 'react'; 
import ResultBox from '../AreaResultBox/ResultBox'; 
import { createService, userStatus } from '../../ApiServices/ApiServices';
export const serviceTypes = ['Electrician', 'Carpenter', 'Barber']
import ClosePopup from '../ClosePopup/ClosePopup';
import { changeToProvider } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';


function ServiceForm(props) {
    const dispatch = useDispatch();

    const [showAreaSearch, setShowAreaSearch] = useState(false)
    const [areaQuery, setAreaQuery] = useState(''); 
    const [service, setService] = useState(''); 
    const [businessName, setbusinessName] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [image, setImage] = useState(''); 
    const [imageURL, setImageURL] = useState(''); 
    const [imageError, setImageError] = useState('');
    const [businessError, setBusinessError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [areaError, setAreaError] = useState('');


    function handleAreaClick(area) {
        setShowAreaSearch(false)
        setAreaQuery(area.area_name)
      }

    function onSubmit() {
        createService({service, businessName, description, image, areaQuery}).then((res) => {
            console.log(res)
            props.invokePopUp()
            dispatch(changeToProvider(res.data.is_provider));
            props.handleFormSubmit(res.data.service)
          }).catch((err) => {
            console.log(err)
            const error = err.response.data.detail 
            if (error.includes('image')) {
                setImageError(error)
                setBusinessError('')
                setDescriptionError('')
                setAreaError('')
            }
            else if (error.includes('busines')) {
                setImageError('')
                setBusinessError(error)
                setDescriptionError('')
                setAreaError('')
            }
            else if (error.includes('descri')) {
                setImageError('')
                setBusinessError('')
                setDescriptionError(error)
                setAreaError('')
            } 
            else if (error.includes('area')) {
                setImageError('')
                setBusinessError('')
                setDescriptionError('')
                setAreaError(error)
            }
          })
    }

  return (
        <>
       <div className="flex flex-col my-4 bg-gray-50 rounded-md space-y-4 shadow-md border
         border-neutral-200 mx-4  hide-scrollbar">
          
          <div className="flex justify-between m-2">
                <button className="rounded bg-white px-2 invisible">X invisible</button>
                <button
                onClick={() => props.setShowForm(false)}
                className="rounded bg-orange-600 hover:bg-orange-500 text-white px-2 shadow-md">X</button>
            </div> 
    
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mx-8 ">
            {/* state */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">service </h2>
                <select type="text" 
                value={service}
                required
                onChange={(e) => setService(e.target.value)}
                className="px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md">
                  <option value='---------'>---------</option>
                    {serviceTypes.map(type => (
                        <option value={type}>{type}</option>
                    ))}
                    
                </select>
                    
            </div> 
            {/* dist */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">Business name</h2>
                <input type="text" 
                required
                value={businessName}
                onChange={(e) => setbusinessName(e.target.value)}
                className=" px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md"/>
                <span className="text-sm text-red-600">{businessError}</span>
            </div>
        </div> 
        <div className="my-2 flex-grow mx-8"> 
                <h2 className="text-black font-medium">Description</h2>
                <textarea 
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md" rows={4}>
                </textarea>
                <span className="text-sm text-red-600">{descriptionError}</span>
        </div> 
        <div className="flex-grow mx-8"> 
                <h2 className="text-black font-medium"></h2>
                <label htmlFor="service_form" className="px-2 py-2 shadow-md w-full  border border-cyan-500
                hover:bg-orange-600 hover:border-0 hover:text-white font-medium
                bg-gray-200 cursor-pointer focus:outline-none focus:ring-0 rounded">
                  upload Image <span className="fas fa-camera ms-1 me-2"></span>
                </label>
                {imageURL && <div className="flex-grow w-1/4 my-4 ">
                    <img src={imageURL} alt="service image" className="border-black rounded shadow"/>
                </div>}
                <input id="service_form" name="image" type="file" accept='image/*'
                required
                onChange={(e) => {
                    setImage(e.target.files[0]); 
                    setImageURL(URL.createObjectURL(e.target.files[0]))
                }}
                className="hidden"/> <br />
                 <span className="text-sm text-red-600">{imageError}</span>
                 
        </div> 
        <div className="flex-grow mx-8">
        <h2 className="text-black font-medium">area </h2>
                <input type="text" 
                required
                value={areaQuery} 
                onFocus={() => setShowAreaSearch(true)}
                onChange={(e) => setAreaQuery(e.target.value)}
                className="px-2 py-2 shadow-md sm:w-3/4  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md"/> <br />
                <span className="text-sm text-red-600">{areaError}</span>
                
        </div>
        <div className="flex-grow mx-8">
              {showAreaSearch && 
                <ResultBox areaQuery={areaQuery} 
                handleAreaClick={handleAreaClick}
                showAreaSearch={showAreaSearch}/>
             }
        </div>
        <div className="flex-grow mx-8">
        <button
        onClick={() => onSubmit()}
          className=" font-medium shadow-lg
          text-white h-8 p-2 bg-red-500 px-4 py-0 fademan w-24 my-4
          rounded-md hover:bg-red-600 zoom-hover focus:outline-orange-500 focus:outline-none" >save
            </button>
          </div>
        </div>
        
        
    </>
  )
}

export default ServiceForm