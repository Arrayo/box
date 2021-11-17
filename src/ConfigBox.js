import React, {useState} from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import './styled.css'

export const ConfigBox = () => {

    
    const [formState, setformState] = useState({
        url: '',
        boxId: '',
        repo_debian: '',
        repo_debian_security: '',
        repo_airsdwan: '',
        if_health_ipv4: '',
        if_health_ipv6: ''
        
    })
    const {
        url,
        boxId,
        repo_debian, 
        repo_debian_security,
        repo_airsdwan,
        if_health_ipv4,
        if_health_ipv6
    } = formState;

    const handleInputChange = ({target}) => {
        setformState({
            ...formState, 
            [target.name]: target.value
        })
    }

    const baseURL = `${url}/boxes/${boxId}/config`;

    const newState = {
        repo_debian          : formState?.repo_debian,
        repo_debian_security : formState?.repo_debian_security,
        repo_airsdwan        : formState?.repo_airsdwan,
        if_health_ipv4       : formState?.if_health_ipv4,
        if_health_ipv6       : formState?.if_health_ipv6,
    }

    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const reset = () => setformState({
        url: '',
        boxId: '',
        repo_debian: '',
        repo_debian_security: '',
        repo_airsdwan: '',
        if_health_ipv4: '',
        if_health_ipv6: ''
    })

    const boxNotFound = () => {
        Swal.fire({
            title: 'BOX NOT FOUND',
            icon: 'error',
            showConfirmButton: false,
            background: 'blanchedalmond',
            timer: 1200,
          })
          setTimeout(() => {
            scroll();
        }, 1500);
    }

    const badRequest = () => {
        Swal.fire({
            title: 'BAD REQUEST',
            icon: 'error',
            showConfirmButton: false,
            background: 'blanchedalmond',
            timer: 1200,
          })
          setTimeout(() => {
            scroll();
        }, 1500);
    }

    const success = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: 'blanchedalmond',
          })
          Toast.fire({
            icon: 'success',
            title: 'Box configured successfully'
          })
          setTimeout(() => {
            scroll();
        }, 2500);
    }

    const use = () => {
        Swal.fire({
            title: 'How to use it?',
            icon: 'question',
            background: 'blanchedalmond',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK',
            html: '1.- Box ID field is <b>mandatory</b><br><br> ' +
            '2.- Url example: <b>http://localhost:3000</b> and is <b>mandatory</b><br><br> ' +
            '3.- Package section fields are <b>strings</b><br><br> ' + 
            '4.- If health examples:<br><br> ' +
            'If health <b>ipv4</b> field => 1.1.1.1, 2.2.2.2, 3.3.3.3<br><br> ' +
            'If health <b>ipv6</b> field => a:a:a:a, b:b:b:b, c:c:c:c<br> ' 
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.entries(newState).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
            axios
              .patch(`${baseURL}`, {
                repo_debian          : data?.repo_debian,
                repo_debian_security : data?.repo_debian_security,
                repo_airsdwan        : data?.repo_airsdwan,
                if_health_ipv4       : data?.if_health_ipv4?.split(',').map((e) => e.trim()),
                if_health_ipv6       : data?.if_health_ipv6?.split(',').map((e) => e.trim()),
              })
              .then((res) => {
                  if (res.status === 200) {
                      success();
                  }
              })
              .catch((error) => {
             (error.response.status === 404) ? boxNotFound() : badRequest();
                reset();
            })
    }

    return (
        <form onSubmit={handleSubmit}>
                <div className="card container p-4">
                    <h2 className="colorTitle">SD-WAN BOX CONFIG TOOL
                    <button onClick={use} type="button" className="btn btn-warning mb-2 info">
                        <h4 className="i">i</h4></button></h2>
                    <br />
                    <div className="card container mb-4">
                        <div className="card-body">
                            <h5 className="card-subtitle decoration white">Box ID
                            <div className="form-group input">
                                <input
                                    type="text"
                                    name="boxId"
                                    className="form-control backInput mt-2 mb-4"
                                    autoComplete="off"
                                    value={boxId || ''}
                                    onChange={handleInputChange} />
                            </div></h5>
                        </div>
                    </div>
                    <div className="card container mt-4">
                        <div className="card-body">
                            <h5 className="card-subtitle decoration white">Url</h5>
                            <h6 className="mt-4 mb-1 text white">Url to patch</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="url"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={url || ''}
                                    onChange={handleInputChange} />
                        </div>
                        </div>
                    </div>
                    <div className="card container mt-4">
                        <div className="card-body">
                            <h5 className="card-subtitle decoration white">Package section</h5>
                            <h6 className="mt-4 mb-1 text white">Repo debian</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="repo_debian"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={repo_debian || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <h6 className="mt-4 mb-1 text white">Repo debian security</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="repo_debian_security"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={repo_debian_security || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <h6 className="mt-4 mb-1 text white">Repo airsdwan</h6>
                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    name="repo_airsdwan"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={repo_airsdwan || ''}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="card container mt-4 mb-4">
                        <div className="card-body">
                            <h5 className="card-subtitle decoration white">If health section</h5>
                            <h6 className="mt-4 mb-1 text white">If health ipv4</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="if_health_ipv4"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={if_health_ipv4 || ''}
                                    onChange={handleInputChange} />
                            </div>
                            <h6 className="mt-4 mb-1 text white">If health ipv6</h6>
                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    name="if_health_ipv6"
                                    className="form-control backInput"
                                    autoComplete="off"
                                    value={if_health_ipv6 || ''}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        <button className="button btn btn-secondary btn-lg" type="submit"> <span className="update">Change configuration </span></button>
                    </div>
                </div>
            </form>
    )
}
