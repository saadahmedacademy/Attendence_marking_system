import * as readline from 'readline';
import { format } from 'date-fns';

class AttendanceSystem {
    private attendanceList: { [key: string]: string[] };

    constructor() {
        this.attendanceList = {};
    }

    markAttendance(name: string): void {
        const date = format(new Date(), 'yyyy-MM-dd');

        if (this.attendanceList[name]) {
            if (this.attendanceList[name].includes(date)) {
                console.log(`Attendance already marked for ${name} on ${date}.`);
            } else {
                this.attendanceList[name].push(date);
                console.log(`${name} has been marked present for ${date}.`);
            }
        } else {
            this.attendanceList[name] = [date];
            console.log(`${name} has been marked present for ${date}.`);
        }
    }

    viewAttendance(): void {
        if (Object.keys(this.attendanceList).length === 0) {
            console.log("No attendance records found.");
        } else {
            for (const [name, dates] of Object.entries(this.attendanceList)) {
                console.log(`${name}: ${dates.join(', ')}`);
            }
        }
    }

    viewSpecificAttendance(name: string): void {
        if (this.attendanceList[name]) {
            const dates = this.attendanceList[name];
            console.log(`${name} has been present on: ${dates.join(', ')}`);
        } else {
            console.log(`No attendance records found for ${name}.`);
        }
    }
}

class AttendanceManagement {
    private attendanceSystem = new AttendanceSystem();

    run(): void {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Attendance Management System");
        
        while (true) {
            console.log("\nOptions:");
            console.log("1. Mark Attendance");
            console.log("2. View Attendance");
            console.log("3. View Specific Attendance");
            console.log("4. Exit");

            rl.question("Select an option: ", (option) => {
                if (option === "1") {
                    rl.question("Enter name: ", (name) => {
                        this.attendanceSystem.markAttendance(name);
                    });
                } else if (option === "2") {
                    this.attendanceSystem.viewAttendance();
                } else if (option === "3") {
                    rl.question("Enter name: ", (name) => {
                        this.attendanceSystem.viewSpecificAttendance(name);
                    });
                } else if (option === "4") {
                    console.log("Exiting...");
                    rl.close();
                    process.exit(0);
                } else {
                    console.log("Invalid option. Please try again.");
                }
            });
        }
    }
}

// Start the system
const attendanceManagement = new AttendanceManagement();
attendanceManagement.run();
