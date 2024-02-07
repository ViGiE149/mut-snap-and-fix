Features
User Reporting:

Users can report damaged properties by taking two pictures, describing the damage, and providing the location.
Users can select the department and campus associated with the reported damage.
Email Notification:

Upon submission, the app triggers an email notification to the maintenance department using the native Gmail app.
Status Checking:

Users can check the status of their reported damage, whether it's pending or completed.
Admin Dashboard:

Admins have access to view all reported damages.
Admins can update the status of reported damages from "Reported" to "Pending" and from "Pending" to "Completed."
Project Structure
src/app:

login: Contains the login page for user authentication.
register: Handles user registration.
report: Manages the reporting of damaged properties.
admin-dashboard: Displays reported damages and allows status updates.
Firebase:

Authentication: Handles user registration and login.
Database: Stores information about reported damages, including images, descriptions, locations, departments, and campuses.
Installation and Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/ViGiE149/mut-snap-and-fix
cd snap-and-fix
cd snap
Install Dependencies:

npm install
Configure Firebase:

Set up a Firebase project and configure the app with your Firebase credentials in src/environments/environment.ts.
Run the App Locally:


ionic serve
Build for Native Platforms:

Use Capacitor to build the app for specific platforms (iOS, Android).
bash
Copy code
npx cap add android
npx cap add ios
npx cap copy
npx cap open android  # or ios


Usage
User Flow:

Users should register or log in to access the reporting feature.
Report damaged properties by providing details, selecting department and campus, and submitting.
Admin Flow:

Admins can log in to the admin dashboard to view all reported damages.
Admins can update the status of reported damages.
Contributing
Contributions are welcome! If you encounter issues or have suggestions, please open an issue or create a pull request.


