# Quizee - Quiz Platform

A comprehensive quiz platform where users can create accounts, manage quizzes, and track quiz performance. The platform includes features such as analytics for quiz attempts, user profiles, and the ability to view other users' quizzes and scorecards.

Created With ❤️ using:
``Next.Js`` ``NodeJs`` ``Typescript`` ``Tailwind CSS`` ``Shadcn UI`` ``Clerk``

### Features
* **User Accounts:** Create and manage user accounts with secure authentication.
* **Quiz Creation:** Users can create quizzes with multiple questions, options, and answers.
* **Quiz Editing:** Edit quizzes even after publishing.
* **Quiz Analytics:** View detailed statistics of users who have taken quizzes.
* **Quiz History:** Users can see their previously taken quizzes, along with their scores.
* **Profile Pages:** Explore user profiles to view their quizzes and performance.
* **Responsive Design:** Fully optimized for mobile and desktop usage.

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MuhammadBinYasir/Quizee.git
   cd Quizee

2. **Install Dependencies**

   ```bash
   npm install

3. **Setup Environment Variables**
     
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
   MONGODB_URI=
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

4. **Run the Application**

   ```bash
   npm run dev

### Technologies Used
* **Next.js:** For server-side rendering and routing.
* **MongoDB:** As the primary database to store users, quizzes, and results.
* **Mongoose:** For schema validation and database interaction.
* **Clerk:** For user authentication and management.
* **Tailwind CSS:** For styling the platform.
* **React Hook Form:** For managing forms and input validation.
* **Zod:** For schema-based form validation.

### Contributions
Feel free to open issues, suggest features, or submit pull requests. Contributions are welcome!


