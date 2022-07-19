
const  encrupted = (data)=>{
    return 'encrypted'
}

export const send = (url, data)=>{
    const encryptedData = encrupted(data)
    //not returning damn its a http send request 
    console.log(`Sending data to the URL`)
}