# Notification Service

## Project Overview
The **Notification Service** is a dedicated microservice within the mdb platform designed to handle multi-channel communications (SMS, Email, Slack, Discord) for both clients and administrative users.

### Purpose
Send critical and promotional notifications, including:
- **Security:** OTP (One-Time Passwords).
- **Onboarding:** Registration welcome messages.
- **Operations:** Billing alerts, deployment notifications (new version deployed).
- **Marketing:** Promotional offers.

### Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express (v5.x)
- **Tooling:** Nodemon, ts-node, dotenv

---

## Mandates & Rules

### Security & Privacy
- **CRITICAL:** Do NOT send sensitive information (PII, credentials, or full tokens) in notification payloads.
- **OTP Handling:** OTPs must be handled with short TTLs and never logged in plain text.

### Architectural Standards
- **Modular Architecture:** Enforce decoupling between the Express controllers and the notification delivery logic (Providers).
- **Provider Pattern:** Implement a "Provider" strategy for different channels (e.g., Twilio for SMS, SendGrid for Email).
- **Error Handling:** All notification failures must be gracefully caught and logged without crashing the service.
- **Port Management:** Default internal port is `3500`.

### Development Workflow
- **Tutorial Mode:** If the project is in "tutorial mode", ONLY suggest changes and explain the "why". Do not apply them automatically.
- **Code Changes:** If asked to make code changes, you MUST perform a "workflow test" yourself (verify the build/runtime if possible).
- **Linter & Style:** Adhere to the mdb platform's standard for TypeScript (Constructor Injection where applicable, explicit typing).

### Testing Requirements
- New features or bug fixes MUST include corresponding unit or integration tests.
- Ensure the service remains stateless to support scaling.

---

## Getting Started
1. **Install dependencies:** npm install
2. **Development mode:** npm run dev
3. **Build:** npm run build
4. **Start Production:** npm run start

## Related Services
- **mdb-web-app:** Frontend consumer.
- **media-data-gateway-service:** Potential upstream event source.
- **PostgreSQL / Kafka:** Shared infrastructure for data and messaging.
