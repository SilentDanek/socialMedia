export const required = (value:string) => {
    return value? undefined: "Field is required";
};

export const maxLengthCreator = (maxLength:number) => {
    return (value:string | null)=>{
        if(value && value.length > maxLength){
            return `Max length is ${maxLength} symbols`;
        }
        return undefined;
    }
};

export const minLengthCreator = (minLength:number) => {
    return (value:string | null)=>{
        if(value && value.length < minLength){
            return `Min length is ${minLength} symbols`;
        }
        return undefined;
    }
};