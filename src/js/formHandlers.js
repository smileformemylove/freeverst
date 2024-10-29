const getFormHandlers = (
    ...args
) => {
    const [form, handleFormData] = args;

    if(args.length < 2) throw new Error(`Too few arguments. getFormHandlers accepts 2 arguments`);
    if( !(form instanceof HTMLFormElement) ) throw new Error(`First argument should be a HTMLFormElement`);
    if( typeof handleFormData  !== 'function') throw new Error(`Second argument should be a function`);

    let isFormSubmitDisabled = true;
    const inputs = Array.from(form.querySelectorAll('input, textarea'));
    const formSubmitBtn = form.querySelector('button[type=submit]');


    const fields = inputs.reduce((acc, {name, type}) => {
        acc[name] = type === 'hidden';
        return acc
    }, {})


    const submitHandler = (event) => {
        event.preventDefault();
        if(isFormSubmitDisabled) return;

        const data = inputs.reduce((acc, {name, value}) => {
            acc[name] = value
            return acc;
        }, {})

        handleFormData({data, event})
    }

    const inputHandler = ({target}) => {
        if(target.value.trim().length) {
            if(!fields[target.name]) fields[target.name] = true;
        } else {
            if(fields[target.name]) fields[target.name] = false;
        }

        isFormSubmitDisabled = !Object.values(fields).every((field) => field);
        isFormSubmitDisabled ?  formSubmitBtn.setAttribute('disabled', '') : formSubmitBtn.removeAttribute('disabled')
    }

    return {
        inputHandler,
        submitHandler
    }
}

 export default getFormHandlers;
