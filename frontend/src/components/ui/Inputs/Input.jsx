import style from "./Input.module.css"

function Input({label, value, onChange, LabelId, type, isRequired, placeholder}) {
    return (
        <div className={style.input__container}>
            <label 
                htmlFor={LabelId} 
                className={style.input__label}>
                {label}
            </label>
            <input 
                name={LabelId} 
                type={type} 
                value={value ?? ""} 
                onChange={onChange} 
                id={LabelId} 
                required={isRequired ? true : false} 
                placeholder={placeholder}
                className={style.input__input} 
            />
        </div>
    )
}

export default Input