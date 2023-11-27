import React from 'react'
import { useState } from "react";
import axios from "axios";
import { InputMask } from 'primereact/inputmask';
import CircularProgress from '@mui/material/CircularProgress';



const Section = () => {

    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        hour: '',
        area: '1',
        age: '',
        date: '',
        genre: '1',
    });

    const handleSubmit = async () => {

        if(values.hour == '' || values.area == '' || values.age == '' || values.date == '' || values.genre == '') {
            alert('Preencha os campos')
            return false    
        }

        setIsLoading(true)
        await axios.post('http://127.0.0.1:3004/values', values).then((response) => {

            let val = response.data
            val.hour = String(val.hour)

            if (val.hour.length == 3) {
                val.hour = '0:' + val.hour
            } else if (val.hour.length == 2) {
                val.hour = "00:" + val.hour
            } else if (val.hour.length == 1) {
                val.hour = '000:' + val.hour
            }
            setRes(val)
        }).catch((err) => console.log(err)).finally(()=>{
            setIsLoading(false)
        })

    }

    const handleData = (e) => {
        const { value, name } = e.target
        console.log(e.target.value)


        setValues((prev) => {
            let newData = { ...prev, [name]: value }
            return newData
        })
    }

    const handleValidHours = (e) =>{
        let { value } = e.target
        let hour = value.split(':')[0]
        let minutes = value.split(':')[1]

        if(hour > 23 || hour < 0 || minutes > 59 || minutes < 0) {
            alert('Hora inválida')
            setValues(prev => ({...prev, hour: '23:59'}))
        }

    }


    return (
        <>
            {isLoading && <>
                <div className='mask'/>
                <CircularProgress className='progress-rol' />
            </>
            } 
            <div className='section-container'>
                {res != '' && <div style={{ flex: 0, marginBottom: 30 }}>{res?.res == 0 ? <span style={{ fontWeight: 'bold', color: 'green' }}>Safelly</span> : <span style={{ fontWeight: 'bold', color: 'red' }}>Warning!</span>}</div>}
                <div className={`section ${res != '' ? res.res == 1 ? 'warning' : 'safelly' : ''}`}>
                    <div className='row'>
                        <div className='form-group col-4'>
                            <label style={{ flex: 1 }} htmlFor="hourInput">Hora: </label>
                            <InputMask onBlur={handleValidHours} mask="99:99" placeholder="00:00" className='form-control' style={{ flex: 1 }} name="hour" value={values.hour} onChange={handleData} id='hourInput' />
                        </div>
                        <div className='form-group col-4'>
                            <label style={{ flex: 1 }} htmlFor="area">Área: </label>
                            <select className='form-select' style={{ flex: 1 }} onChange={handleData} value={values.area} id='area' name="area">
                                <option value="1">Central</option>
                                <option value="2">Rampart</option>
                                <option value="3">Southwest</option>
                                <option value="4">Hollenbeck</option>
                                <option value="5">Harbor</option>
                                <option value="6">Hollywood</option>
                                <option value="7">Wilshire</option>
                                <option value="8">West LA</option>
                                <option value="9">Van Nuys</option>
                                <option value="10">West Valley</option>
                                <option value="11">Northeast</option>
                                <option value="12">77th Street</option>
                                <option value="13">Newton</option>
                                <option value="14">Pacific</option>
                                <option value="15">N Hollywood</option>
                                <option value="16">Foothill</option>
                                <option value="17">Devonshire</option>
                                <option value="18">Southeast</option>
                                <option value="19">Mission</option>
                                <option value="20">Olympic</option>
                                <option value="21">Topanga</option>
                            </select>
                        </div>

                        <div className='form-group col-4 mb-4'>
                            <label style={{ flex: 1 }} htmlFor="genre">Gênero: </label>
                            <select className='form-select' style={{ flex: 1 }} onChange={handleData} value={values.genre} id='genre' name="genre">
                                <option value="0">Masculino</option>
                                <option value="1">Feminino</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className='form-group col-6'>
                            <label style={{ flex: 1 }} htmlFor="age">Idade: </label>
                            <InputMask mask='99' placeholder='99' className='form-control' style={{ flex: 1 }} name="age" value={values.age} onChange={handleData} id='age' />
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="date">Data: </label>
                            <input onChange={handleData} type="date" name='date' value={values.date} className="form-control" id="date" />
                        </div>
                    </div>

                    <div className='d-flex'>
                        <button className='btn btn-primary' style={{ flex: 1 }} onClick={() => handleSubmit()}>Enviar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Section