
# ProjeX

ProjeX is a project management application built with **Next.js**. It allows users to create, manage projects, and collaborate effectively in real-time.

## Features

- **User authentication** (Login and Registration)
- **Real-time notifications** with Socket.io
- **Task management** with deadlines and priorities
- **Project dashboards** with statistics and analytics
- **User management** (Admin can manage user roles within the project)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/projex.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```env
    DATABASE_URL=your-database-connection-string
    JWT_SECRET=your-jwt-secret
    SENDGRID_SECRET=your-sendgrid-secret
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Access the application at [http://localhost:3000](http://localhost:3000)

### Technologies Used

- **Next.js** (Full-stack React framework)
- **React** (UI Components)
- **Tailwind CSS** (UI Styling)
- **Prisma** (ORM for database management with PostgreSQL)
- **PostgreSQL** (Database)
- **Socket.io** (Real-time notifications)
- **JWT** (User authentication)
- **SendGrid** (Email services)

## License

This project is licensed under the **GNU Affero General Public License (AGPL)**.
