# Notification Service

The **Notification Service** is a dedicated microservice within the mdb platform designed to handle multi-channel communications (SMS, Email, Slack, Discord) for both clients and administrative users.

## Features
- **Security:** One-Time Passwords (OTP) with short TTLs.
- **Onboarding:** Automated registration welcome messages.
- **Operations:** Billing alerts and deployment notifications.
- **Marketing:** Promotional campaign delivery.

## Tech Stack
- **Runtime:** [Node.js](https://nodejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express v5.x](https://expressjs.com/)
- **Infrastructure:** Kafka, PostgreSQL (shared)

## Prerequisites
- Node.js (v18+)
- npm or yarn

## Installation
Clone the repository and install dependencies:
```bash
npm install
```

## Development
To start the service in development mode with hot-reloading:
```bash
npm run dev
```

## Production
Build the project and start the server:
```bash
npm run build
npm start
```

## API Endpoints (Base Port: 3500)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | GET | Health check / Welcome message |
| `/welcome` | GET | User onboarding welcome message |
| `/otp` | GET | OTP generation and dispatch |

## Architecture
The service follows a modular architecture using the **Provider Pattern** to decouple Express controllers from delivery implementations (e.g., SendGrid, Twilio). This allows for seamless scaling and easy addition of new communication channels.

## Related Services
- **mdb-web-app:** Frontend consumer.
- **media-data-gateway-service:** Upstream event source.
- **PostgreSQL / Kafka:** Shared infrastructure for data and messaging.

## License
ISC


*branching name: communicators (marconi, morse, bell, tesla, hertz)*

docker build -t notification-service . 
docker tag notification-service:latest 145099743252137218288881570337/notification-service:latest  
docker push 145099743252137218288881570337/notification-service:latest         