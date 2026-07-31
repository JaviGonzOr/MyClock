import { BaseRepository } from "./base.repository";
import { Schedule } from "@/types/schedule";

export type ScheduleData =
Omit<
Schedule,
"id"|"created_at"
>;

class ScheduleRepository extends BaseRepository{

async all(){

const{
data,
error
}=await this.db
.from("schedules")
.select("*")
.order("name");

if(error)throw error;

return(data??[])as Schedule[];

}

async byId(id:string){

const{
data,
error
}=await this.db
.from("schedules")
.select("*")
.eq("id",id)
.single();

if(error)throw error;

return data as Schedule;

}

async create(
data:ScheduleData
){

const{
data:schedule,
error
}=await this.db
.from("schedules")
.insert(data)
.select()
.single();

if(error)throw error;

return schedule;

}

async update(
id:string,
data:Partial<ScheduleData>
){

const{
data:schedule,
error
}=await this.db
.from("schedules")
.update(data)
.eq("id",id)
.select()
.single();

if(error)throw error;

return schedule;

}

async delete(
id:string
){

const{error}=await this.db
.from("schedules")
.delete()
.eq("id",id);

if(error)throw error;

}

}

export const scheduleRepository=
new ScheduleRepository();