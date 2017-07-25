export class Clas{
	id: number;
	className: string;
	schoolId: number;
	teacherId: number;
	attendanceType: string;
	constructor(id?: number, className?: string){
		this.id = id;
		this.className = className;
	}
}