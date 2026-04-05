import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set)=>({
    user: null,
    token: null,
    setAuth:(userData,token)=>{
        set({user:userData,token:token});
        if(token)AsyncStorage.setItem('userToken',token);
        if(userData)AsyncStorage.setItem('userData',JSON.stringify(userData));
    },
    logout: async()=>{
        set({user:null,token:null});
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
    }
})) 


export default useAuthStore;

// yha pr jo h userData or aur token kha se a rha jab register kr rhe h tab and jab login jab
// accha yha jo userData aur autApi mein userData kya ye dono same h kya
// userData wo data h jo backend se aata h jab user login ya register krta h usme user ki details hoti h jaise name email role etc. token bhi aata h jo authentication ke liye use hota h
// setAuth function me userData aur token ko store me set kr rhe h aur AsyncStorage me bhi save kr rhe h taki app close hone ke baad bhi data rahe
// ye jo a rha h useData aur token wo kis file se a rhah
// jab user login krta h toh backend se response aata h usme userData aur token hota h toh usko hum setAuth me pass kr rhe h taki wo store me save ho jaye aur app ke sare components usko access kr ske
// accha accha to jab loginUser Method banaya wha pr to credentials ye pass kiya h 
// but jab hum setAuth upar call kr rhe h  to wha to userData aur token pass kr rhe h toh ye dono cheeze kaha se a rhi h
// jab user login krta h toh backend se response aata h usme userData aur token hota h toh usko hum setAuth me pass kr rhe h taki wo store me save ho jaye aur app ke sare components usko access kr ske

// userData kha se a rha h ? jab user login ya register krta h toh backend se aata h usme user ki details hoti h jaise name email role etc. token bhi aata h jo authentication ke liye use hota h 
// setAuth function me userData aur token ko store me set kr rhe h aur AsyncStorage me bhi save kr rhe h taki app close hone ke baad bhi data rahe
// ye jo a rha h useData aur token wo kis file se a rhah


// ki mene jab mene loginUser Method banaya wha pr to credentials ye pass kiya h 
// but jab hum setAuth upar call kr rhe h  to wha to userData aur token pass kr rhe h toh ye dono cheeze kaha se a rhi h
// jab user login krta h toh backend se response aata h usme userData aur token hota h toh usko hum setAuth me pass kr rhe h taki wo store me save ho jaye aur app ke sare components usko access kr ske
// accha accha to jab loginUser method mein api call kr rhe h ab credentials iska role kya h 
// iska role h jba user login kr rha h to wo apna email aur password 
// login krte waqt deta h ok credentials iska work hota h ab isme kya hota h jab user details fill kr di login wha pr to tab ye sara methoad call hotah accha credentials iska name kuch bi rkh skte h but smjhne ke liye maine credentials rkh diya h taki smjh me aaye ki ye user ke login details h jaise email aur password
// credentials ye cheeje back the scene kese work krti h jab user login krta h tab wo apnna e and pass deta h aur jab wo login ko trigger krta h to ye loginUser method call hota h aur usme credentials pass hota h jo user ke email aur password h backend me api call hota h aur agar login successful hota h to backend se response aata h usme userData aur token hota h toh usko hum setAuth me pass kr dete h taki wo store me save ho jaye aur app ke sare components usko access kr ske
// accha ab smj aya ki credentials mein sara data a jata h credentials ke variable ke trh work kr rha 
// jese hum kya krte the redux ke andar hum action reducer ko call krte the the yha pr simple call krte h 
// accha zustand ke andar hum action or reducer kyu nhi bnate h kyu iske andar simple function bnate h aur usme state ko update kr dete h
// zustand me hum action or reducer isliye nhi bnate h kyuki ye ek simple aur lightweight state management library h jisme hum directly state ko update kr skte h bina kisi boilerplate code ke 
// isme hum ek function bnate h jo state ko update krta h aur usko store me set kr dete h taki wo app ke sare components me available ho jaye
// yha pr zustand use krne iske mechansim phele state maintain krta h back of the secne or esa redux toolkit mein nhi hota h wha pr hum action reeducer bnate hai or usko dispatch krte h but yha pr hum directly state ko update kr dete h aur ye zustand ke andar hota h jo ki simple aur efficient hai