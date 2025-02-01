
# Express Middleware Guide 🚀

This guide provides an in-depth look at Express middleware in Node.js. You will learn about different middleware types including built-in, custom, third-party, app-level, and route-level middleware. Detailed steps and practical code examples are provided to help you understand and implement middleware in your Express applications.

---

## Table of Contents

1. [Introduction to Middleware](#1-introduction-to-middleware)
2. [Built-in Middleware](#2-built-in-middleware)
3. [Custom Middleware](#3-custom-middleware)
4. [Third-party Middleware](#4-third-party-middleware)
5. [App-Level Middleware](#5-app-level-middleware)
6. [Route-Level Middleware](#6-route-level-middleware)
7. [Conclusion](#7-conclusion)

---

<!-- Adjust the image paths and styles as needed -->
<p align="center">
  <img src="./assests/_- visual selection.svg" alt="Middleware Visual" style="max-width: 80%; height: auto;" />
</p>

---

## 1. Introduction to Middleware

Middleware functions in Express are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. They can execute any code, make changes to the request and response objects, end the request-response cycle, or call the next middleware in the chain.

**Key Points:**

- **Order Matters:** Middleware is executed in the order it is defined.
- **Chain of Responsibility:** Middleware functions may terminate the request-response cycle or pass control to the next middleware using the `next()` function.
- **Enhancements:** They are used to add functionalities like logging, authentication, error handling, parsing request bodies, etc.

---

## 2. Built-in Middleware

Express ships with several built-in middleware functions that solve common use cases. Two of the most frequently used built-in middleware functions are `express.json()` and `express.urlencoded()`.

### Steps to Use Built-in Middleware

1. **Install Express:**  
   Make sure you have Express installed in your project:
   ```bash
   npm install express
   ```

2. **Require Express in Your File:**  
   Create an Express application and use the built-in middleware.

### Code Example

```typescript
// Import the Express module
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Use built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A sample route to test JSON body parsing
app.post('/data', (req: Request, res: Response) => {
  res.send({
    message: "Data received successfully!",
    data: req.body
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
```

---

## 3. Custom Middleware

Custom middleware is middleware that you create to handle specific needs, such as logging requests, validating data, or enforcing business rules.

<p align="center">
  <img src="./assests/_- visual selection (2).svg" alt="Custom Middleware Visual" style="max-width: 80%; height: auto;" />
</p>

### Steps to Create Custom Middleware

1. **Define a Middleware Function:**  
   Write a function that takes `req`, `res`, and `next` as parameters.
2. **Perform Desired Operations:**  
   Execute code such as logging, modifying the request object, etc.
3. **Call `next()`:**  
   End your middleware by calling `next()` so that control passes to the next middleware.

### Code Example

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Custom middleware example: Logging each request's method and URL
function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  // Proceed to the next middleware function
  next();
}

// Use the custom middleware
app.use(loggerMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, Express with custom middleware!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 4. Third-party Middleware

Third-party middleware are external packages installed from npm that add extra functionality to your Express app. Examples include `morgan` for logging, `cors` for enabling Cross-Origin Resource Sharing, and `helmet` for security headers.

### Steps to Use Third-party Middleware

1. **Install the Middleware Package:**  
   For example, to use `morgan` for logging:
   ```bash
   npm install morgan
   ```
2. **Require and Use the Middleware in Your App:**  
   Import and call the middleware function via `app.use()`.

### Code Example Using Morgan

```typescript
import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

// Use morgan middleware for logging HTTP requests
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, Express with Morgan logging!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 5. App-Level Middleware

App-level middleware is bound to an instance of the Express app using `app.use()` or `app.METHOD()`. It applies to all requests or only specific HTTP methods/routes, based on where you mount it.

### Steps to Add App-Level Middleware

1. **Define or Import Middleware:**  
   Either create custom middleware or use third-party middleware.
2. **Mount it with `app.use()`:**  
   This will apply it for every incoming request.
3. **Optionally, mount middleware to specific routes**

### Code Example

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Custom app-level middleware that applies to all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("App-level middleware invoked");
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from app-level middleware!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 6. Route-Level Middleware

Route-level middleware is applied only to specific routes. This provides finer control over which routes execute the middleware.

<p align="center">
  <img src="./assests/_- visual selection (1).svg" alt="Route-Level Middleware Visual" style="max-width: 80%; height: auto;" />
</p>

### Steps to Add Route-Level Middleware

1. **Define the Middleware Function:**  
   Create a function that takes `req`, `res`, and `next`.
2. **Use it on Specific Routes:**  
   Pass the middleware function as an argument to the route handler.

### Code Example

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Route-level middleware: Checks if a query parameter 'token' is present
function tokenValidator(req: Request, res: Response, next: NextFunction): void {
  const token = req.query.token;
  if (token === 'secret') {
    console.log("Valid token provided");
    next(); // Continue to the route handler
  } else {
    res.status(401).send("Unauthorized: Invalid token");
  }
}

// Apply route-level middleware to the '/protected' route only
app.get('/protected', tokenValidator, (req: Request, res: Response) => {
  res.send("Welcome to the protected route!");
});

// A public route without middleware
app.get('/', (req: Request, res: Response) => {
  res.send("Public route, no token needed.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 7. Conclusion

In this guide, we explored Express middleware in detail:  
- **Built-in Middleware:** Like `express.json()` and `express.urlencoded()`.  
- **Custom Middleware:** Created to cater to specific needs such as logging.  
- **Third-party Middleware:** Integrated using npm packages such as `morgan`, `cors`, or `helmet`.  
- **App-Level Middleware:** Registered globally on the Express app.  
- **Route-Level Middleware:** Applied to individual routes for fine-grained control.

By understanding and effectively using these middleware types, you can build robust, maintainable, and scalable Express applications.

Happy coding! 🚀
