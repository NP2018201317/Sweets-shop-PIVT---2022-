import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave,} from '@fortawesome/free-regular-svg-icons';
import { api } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminCategoryAdd() {

    const [ name, setName ] = useState<string>("");
    const [ imagePath, setImagePath ] = useState<string>("");
    const [ measurement, setMeasurement ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const navigate = useNavigate();

    function doAddCategory() {
        api("post", "/api/category", "administrator", {name, imagePath, measurement})
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            navigate("/admin/dashboard/category/list", {
                replace:true,
            })
        })
    }
    
    return (
        <div className="row">
            <div className="col-12 col-md-8 offset-md2 col-lg-6 offset-lg-3">
                <div className="card" style={{width: "500px"}}>
                    <div className="card-body">
                        <div className="card-tittle">
                            <h1 className="h5">Add new category</h1>
                        </div>
                        <div className="card-text p-2">
                            <div className="form-group mb-2">
                                <label htmlFor="input-name">Name</label>
                                <input type="text" id="input-name" className="form-control"
                                    value={ name}
                                    onChange={ e => setName(e.target.value) } />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="input-imagePath">Image Path</label>
                                <input type="text" id="input-imagePath" className="form-control"
                                    value={ imagePath}
                                    onChange={ e => setImagePath(e.target.value) } />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="input-measurement">Measurement</label>
                                <select id="input-measurement" className="form-control"
                                    value={ measurement}
                                    onChange={ e => setMeasurement(e.target.value) } >
                                        <option selected>Select an option</option>
                                        <option>100g</option>
                                        <option>komad</option>
                                        <option>kugla</option>

                                    </select>
                            </div>

                            <div className="form-group">
                                <button className='btn btn-primary' onClick={ () => doAddCategory() }>
                                    <FontAwesomeIcon icon={ faSave } />
                                    &nbsp; Add new category
                                </button>
                            </div>

                            { errorMessage && <p className="mt-4 alert alert-danger">{ errorMessage }</p>}    
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}