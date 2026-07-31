import{
vacationRepository,
VacationData
}from "@/repositories/vacation.repository";

class VacationService{

list(){
return vacationRepository.all();
}

create(
data:VacationData
){
return vacationRepository.create(data);
}

approve(
id:string,
admin:string
){
return vacationRepository.approve(
id,
admin
);
}

reject(
id:string,
admin:string
){
return vacationRepository.reject(
id,
admin
);
}

}

export const vacationService=
new VacationService();