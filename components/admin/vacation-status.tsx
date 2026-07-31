type Props={
status:string;
};

export function VacationStatus({
status
}:Props){

const colors={

pending:
"bg-orange-100 text-orange-700",

approved:
"bg-green-100 text-green-700",

rejected:
"bg-red-100 text-red-700"

};

return(

<span
className={`rounded-full px-3 py-1 text-xs font-bold ${colors[status as keyof typeof colors]}`}
>

{status}

</span>

);

}