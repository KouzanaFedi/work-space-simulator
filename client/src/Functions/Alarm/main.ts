
import * as schedule from "node-schedule";
import * as cron from "node-cron";

export class Alarm {


	date: string;
	deletable: boolean;
	label: string;
	id: number;
	on: boolean;
	constructor(date: string, deletable: boolean, label: string, id: number) {

		this.date = date;

		/*= new Date(date).toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true
		});*/
		this.deletable = deletable;
		this.label = label;
		this.id = id
		this.on = true;


		/*	const rule = new schedule.RecurrenceRule();
	
			rule.minute = date.split(":")[1];
			rule.hour = parseInt(date.split(":")[0]) + 1;
	*/


		cron.schedule(date.split(":")[1] + ' ' + parseInt(date.split(":")[0]) + 1 + ' * * *', () => {
			if (Notification.permission === "granted") {
				// If it's okay let's create a notification
				const notification = new Notification(this.label);
			}
		});

		/*const j = schedule.scheduleJob(rule, () => {
			if (Notification.permission === "granted") {
				// If it's okay let's create a notification
				const notification = new Notification(this.label);
			}
		});*/



	}

}

