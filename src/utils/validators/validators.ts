export const required = (value:string) => {
    return value? undefined: "Field is required";
};

export const maxLengthCreator = (maxLength:number) => {
    return (value:string)=>{
        if(value && value.length > maxLength){
            return `Max length is ${maxLength} symbols`;
        }
    }
};

export const minLengthCreator = (minLength:number) => {
    return (value:string)=>{
        if(value && value.length <= minLength){
            return `Min length is ${minLength} symbols`;
        }
    }
};