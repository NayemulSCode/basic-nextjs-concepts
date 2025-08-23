A[User Requests /products] --> B[Next.js Server Receives Request]

    B --> C{Route Type Check}
    C -->|App Router| D[Start App Router Process]
    C -->|Pages Router| E[Legacy Pages Process]

    D --> F[Phase 1: Server Components Execution]
    F --> G[Phase 2: RSC Tree Generation]
    G --> H[Phase 3: Client Components Pre-rendering]
    H --> I[Phase 4: HTML + RSC Payload Creation]
    I --> J[Phase 5: Response to Browser]
    J --> K[Phase 6: Browser Processing]
    K --> L[Phase 7: JavaScript Loading]
    L --> M[Phase 8: Hydration Process]
    M --> N[Phase 9: Interactive Page Ready]
