"use client";

import{
useEffect,
useState
}from"react";

import{
vacationService
}from "@/services/vacation.service";

export function useVacations(){

const[
vacations,
setVacations
]=useState<any[]>([]);

const[
loading,
setLoading
]=useState(true);

async function refresh(){

setLoading(true);

setVacations(
await vacationService.list()
);

setLoading(false);

}

useEffect(()=>{
refresh();
},[]);

return{

vacations,

loading,

refresh

};

}