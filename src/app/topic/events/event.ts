export class Event {
	id: number;
	schoolId: number;
	eventTitle: string;
	eventDescription: string;
	startDate: string;
	endDate: string;
	startTime: number;
	endTime: number;
	noOfDays: number;
	isContinuousDays: boolean;
	isFullDayEvent: boolean;
	isRecurring: boolean;
	createdBy: String;
	createdDate: String;
	parentEventId: number;
}