import { BaseRepository } from "./base.repository";
import { Vacation } from "@/types/vacation";

export type VacationData =
Omit<
Vacation,
"id"|
"approved_by"|
"approved_at"|
"created_at"
>;

class VacationRepository extends BaseRepository{

async all(){

const{
data,
error
}=await this.db
.from("vacations")
.select(`
*,
profiles(
full_name
)
`)
.order("start_date");

if(error)throw error;

return data??[];

}

async create(
data:VacationData
){

const{
data:vacation,
error
}=await this.db
.from("vacations")
.insert(data)
.select()
.single();

if(error)throw error;

return vacation;

}

async approve(
id:string,
admin:string
){

const{error}=await this.db
.from("vacations")
.update({

status:"approved",

approved_by:admin,

approved_at:new Date().toISOString()

})
.eq("id",id);

if(error)throw error;

}

async reject(
id:string,
admin:string
){

const{error}=await this.db
.from("vacations")
.update({

status:"rejected",

approved_by:admin,

approved_at:new Date().toISOString()

})
.eq("id",id);

if(error)throw error;

}

}

export const vacationRepository=
new VacationRepository();