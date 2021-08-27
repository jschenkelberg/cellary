import { useState } from 'react';

const useEditForm =(callback, id)=> {
const [values, setValues]=useState({});
const handleChange =(event)=> {
    event.persist();
    setValues({...values,id,[event.target.name] : event.target.value, alert:0});

}
const handleSubmit =(event)=> {
    event.preventDefault();
    callback();
};
return {values,handleChange,handleSubmit}
};

export default useEditForm;