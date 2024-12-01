## Complaint Desk: A Streamlined Complaint Management System for Universities (MERN Stack)

**Empowering students, teachers, and administrators with a user-friendly platform for voicing concerns and fostering collaborative resolution.**

**Table of Contents**

* [Project Overview](#project-overview)
* [Features](#features)
    * Student Features
    * Teacher Features (Complaint Committee Members)
    * Admin Features
    * Additional Features
* [Screenshots](#screenshots)
* [Project Structure](#project-structure)
    * Frontend (React.js)
    * Backend (Node.js, Express.js, MongoDB)
* [Installation and Setup](#installation-and-setup)
    * Prerequisites
    * Backend Setup
    * Frontend Setup (if applicable)
* [Developer Credits](#developer-credits)

## Project Overview

ComplaintDesk is a web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that empowers students at universities to raise concerns effectively, track the progress of their complaints, and provide feedback. It also streamlines complaint management for teachers (committee members) and administrators, fostering a more transparent and responsive university environment.

## Features

**Student Features**

* **File Complaints:** Easily submit concerns, categorized by department for targeted resolution.
  To submit complaints, students must create an account and be verified by the Chairman.
* **Profile:** Each student will have their own profile.
* **Track Status:** Stay updated on the progress of your complaints with clear status updates.
* **Provide Feedback:** Share experience with the complaint resolution process after it's been addressed, helping improve procedures.

**Teacher (Committee Member) Dashboard**

* **Verify Email and Register:** Teachers can securely create an account using their university or personal email to join the complaint resolution committee.
* **Access Complaint Dashboard:** Once registered and verified, teachers can access a personalized dashboard to view and manage student complaints. They can track the status, resolve issues, and ensure timely resolutions.
* **Resolve Complaints:** Teachers can take action on complaints by providing updates or resolutions. They can communicate directly with the concerned student, ensuring the progress of each complaint.

**Admin Features**
  * Admin can easily assign and manage the Chairman for each department's committee.
  * Admin has the ability to remove or replace the Chairman.
  * Only members of the committee will have access to the dashboard.

**Teacher Account Creation**
  * Teachers can create accounts using their university email or personal email.
  * Email verification is required to create a teacher account.
  * The teacher account must also be verified by the Chairman.

**Additional Features**

* **Password Recovery:** Forgot your password? No worries! Recover it seamlessly through email verification.
* **Complaint Dashboard:** Only authorized committee members have access to the dashboard, maintaining data privacy and confidentiality.
* **Donations via SSLCOMMERZ (Optional):** Support ComplaintDesk by making secure donations through the integrated SSLCOMMERZ payment gateway (requires configuration).

## Screenshots
Here are some screenshots of the application:

**Home Page** ![Home Page](https://github.com/takbir-hasan/Complaint_Desk/blob/475a51ef83d797f67d49e46e4c7098e8a42a3daa/ScreenShorts/Home%20Page.png)

**Write Complaint** ![Write Complaint](https://github.com/takbir-hasan/Complaint_Desk/blob/92e0bec2964ce8ec6b709ddd32768ed0f6602378/ScreenShorts/Write%20Complaint.png)

**Check Complaint Status** ![Check Status](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/check.png?raw=true)

**Student Profile** ![StudentProfile](https://github.com/takbir-hasan/Complaint_Desk/blob/7b5acac3d47d5bfb2cba3dcfeaea927096f91f36/ScreenShorts/StudentProfile.png)

**Student Login** ![Student Login](https://github.com/takbir-hasan/Complaint_Desk/blob/7b5acac3d47d5bfb2cba3dcfeaea927096f91f36/ScreenShorts/StudentLogin.png)

**Student Signup** ![Student Signup](https://github.com/takbir-hasan/Complaint_Desk/blob/7b5acac3d47d5bfb2cba3dcfeaea927096f91f36/ScreenShorts/StudentSignup.png)

**Teacher Login**
![Teacher Login](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/login.png?raw=true)

**Teacher SignUp**
![Teacher SignUp](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/teacher%20Signup.png?raw=true)

**Update Teacher Profile**
![Update Teacher Profile](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/update%20Teacher%20%20Profile.png?raw=true)

**Teacher Profile**
![Teacher Com. Dash.](https://github.com/takbir-hasan/Complaint_Desk/blob/b7465bdb393a09409d85d204ca5fb19c60e5c19c/ScreenShorts/TeacherProfile.png)

**Complaint Dashboard**
![Committee Dashboard](https://github.com/takbir-hasan/Complaint_Desk/blob/2de05d1c70ab8dba9646606f62a6f753bb422bf8/ScreenShorts/ComplaintDashboard.png)

**Teacher List** 
![Teacher List](https://github.com/takbir-hasan/Complaint_Desk/blob/7b5acac3d47d5bfb2cba3dcfeaea927096f91f36/ScreenShorts/TeacherListPage.png)

**Student List**
![Student List](https://github.com/takbir-hasan/Complaint_Desk/blob/7b5acac3d47d5bfb2cba3dcfeaea927096f91f36/ScreenShorts/StudentListPage.png)

**Admin Login**
![Admin Login](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/admin%20login.png?raw=true)

**Admin Profile**
![Admin Profile](https://github.com/takbir-hasan/Complaint_Desk/blob/496bdb7e3990a3c21564616a15fca00359218df3/ScreenShorts/AdminProfile.png)

**Admin Dashboard**
![Admin Dashboard](https://github.com/takbir-hasan/Complaint_Desk/blob/67646cad48f49169422509a818372dcca1e3b5d7/ScreenShorts/AdminDashboard.png)

**Donate**
![Donate](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/Donate.png?raw=true)![SSLCOMMERZ](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/sslcommerz.png?raw=true)

**Feedback**
![Feedback](https://github.com/takbir-hasan/Complaint_Desk/blob/main/ScreenShorts/Feedback.png?raw=true)


## Project Structure

**Frontend (React.js)**

* Built with React.js for a dynamic and visually appealing user interface.
* Implements role-based routing to provide tailored interfaces for students, teachers (committee members), and admins.
* Manages user state for complaint statuses and maintains session information.
* Offers seamless API integration for communication with the backend.
* Integrates flawlessly with the SSLCOMMERZ payment gateway for secure donations (optional).

**Backend (Node.js, Express.js, MongoDB)**

* Manages API routes, user authentication (logins, signups), and database operations (storing, retrieving, and updating information).
* Provides robust functionality for complaint management, including submission, status updates, and resolution tracking.
* Facilitates donation processing securely through the SSLCOMMERZ integration (optional).
* Implements role-based authorization to restrict access based on user roles, ensuring data security.

## Installation and Setup

**Prerequisites**

* Node.js and npm (Node Package Manager) installed on your system.
* MongoDB running either locally or on a cloud platform like MongoDB Atlas.
* SSLCOMMERZ API credentials to enable the donation feature (optional).

**Backend Setup**

1.  Clone the repository:

    ```bash
    git clone [https://github.com/takbir-hasan/Complaint_Desk.git]
    ```

2.  Navigate to the backend directory:

    ```bash
    cd Complaint_Desk/backend
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env` file to store sensitive environment variables (database connection details, SSLCOMMERZ credentials, etc.). Refer to the backend documentation for specific instructions.

5.  Start the backend server:

    ```bash
    npm start
    ```

**Frontend Setup (if applicable)**

1.  Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm start
    ```

## Developer Credits

*  <a href="https://www.linkedin.com/in/sajid-hasan-takbir">**Sajid Hasan Takbir**</a>
*  <a href="https://www.linkedin.com/in/md-saniul-basir-saz">**Md Saniul Basir Saz**</a>


