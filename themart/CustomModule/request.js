import { send } from "./http"
import { read } from "./response"

export const request = ()=>{
    const egettingencryptedcall = send('url', 'bla bla data')
    const decyptedResponse = read(response)
}