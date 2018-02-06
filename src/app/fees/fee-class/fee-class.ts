export class FeeClass{
	id: number;
	className: string;
	schoolId: number;
	feeAmount: number;
	feeType: string;
	constructor(id?: number, className?: string){
		this.id = id;
		this.className = className;
	}
}