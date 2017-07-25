export class Section{
	id: number;
	sectionName: string;
	classId: number;
	teacherId: number;
	constructor(id?: number, sectionName?: string){ 
		this.id = id;
		this.sectionName = sectionName;
	}
}