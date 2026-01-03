# WalletX

**WalletX** is a production-grade financial platform for tracking of income and expenses.

It goes beyond standard MERN apps by utilizing **AWS EC2** and **Docker** infrastructure with **Nginx** and **SSL/TLS**. Security is reinforced using **JWT Authentication** and **Bcrypt** password hashing.

[Live](https://walletx-1jay.vercel.app)

### **Frontend**

- **Core:** React.js (Vite Build Tool)
- **Styling:** Tailwind CSS (Responsive Design)
- **State & Effects:** Context API, React Hooks (useEffect)
- **Networking:** Axios (HTTP Client)

### **Backend**

- **Runtime:** Node.js & Express.js
- **Database:** MongoDB
- **Auth & Security:** JWT, Bcrypt, Express-Rate-Limit, CORS
- **API Style:** RESTful Architecture

### **DevOps & Cloud Infrastructure**

- **Cloud Provider:** AWS EC2 (Ubuntu Instance)
- **Containerization:** Docker (Custom Node.js Image)
- **Web Server:** Nginx (Reverse Proxy)
- **Security & DNS:** HTTPS/SSL via Certbot (Let's Encrypt), DuckDNS

---

## Key Architecture Highlights

- **Production-Grade DevOps:** Moved beyond PaaS by manually configuring an **AWS EC2** instance with **Docker** containers for full environment isolation.
- **Secure Networking:** Implemented **Nginx** as a reverse proxy to handle port forwarding and serve the API securely over **HTTPS (SSL/TLS)**.
- **DDoS Protection:** Integrated **Rate Limiting** middleware to restrict abusive IP traffic and prevent brute-force attacks.
- **Decoupled Architecture:** Frontend hosted on Vercel (CI/CD) communicating securely with the Dockerized backend on AWS.

<img src="./assets/elast.png"></img>
<img src="./assets/elast2.png"></img>
<img src="./assets/w1.png"></img>
<img src="./assets/w2.png"></img>
<img src="./assets/w3.png"></img>
