from datetime import datetime

class AttendanceSystem:
    def __init__(self):
        self.attendance_list = {}

    def mark_attendance(self, name):
        date = datetime.now().strftime("%Y-%m-%d")
        
        if name in self.attendance_list:
            if date in self.attendance_list[name]:
                print(f"Attendance already marked for {name} on {date}.")
            else:
                self.attendance_list[name].append(date)
                print(f"{name} has been marked present for {date}.")
        else:
            self.attendance_list[name] = [date]
            print(f"{name} has been marked present for {date}.")

    def view_attendance(self):
        if not self.attendance_list:
            print("No attendance records found.")
        else:
            for name, dates in self.attendance_list.items():
                print(f"{name}: {', '.join(dates)}")

    def view_specific_attendance(self, name):
        if name in self.attendance_list:
            dates = self.attendance_list[name]
            print(f"{name} has been present on: {', '.join(dates)}")
        else:
            print(f"No attendance records found for {name}.")


class AttendanceManagement:
    def __init__(self):
        self.attendance_system = AttendanceSystem()

    def run(self):
        print("Attendance Management System")
        
        while True:
            print("\nOptions:")
            print("1. Mark Attendance")
            print("2. View Attendance")
            print("3. View Specific Attendance")
            print("4. Exit")

            option = input("Select an option: ")
            if option == "1":
                name = input("Enter name: ")
                self.attendance_system.mark_attendance(name)
            elif option == "2":
                self.attendance_system.view_attendance()
            elif option == "3":
                name = input("Enter name: ")
                self.attendance_system.view_specific_attendance(name)
            elif option == "4":
                print("Exiting...")
                break
            else:
                print("Invalid option. Please try again.")


# Start the system
attendance_management = AttendanceManagement()
attendance_management.run()
