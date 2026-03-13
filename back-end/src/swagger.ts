import type { OpenAPIV3 } from "openapi-types";

const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Notes App API",
    version: "1.0.0",
    description:
      "REST API for the Notes App — a full-stack note-taking application. Authentication is handled via an HTTP-only cookie (`authToken`) set on sign-in.",
  },
  servers: [
    {
      url: "http://localhost:8080/api/v1",
      description: "Local development server",
    },
  ],

  // ────────────────────────────────────────────────────────────
  // Security
  // ────────────────────────────────────────────────────────────
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "authToken",
        description:
          "JWT token stored in an HTTP-only cookie. Call `POST /auth/sign-in` to obtain it.",
      },
    },
    schemas: {
      // ── Primitives / sub-objects ──────────────────────────
      UserPublic: {
        type: "object",
        description: "A user object with the password field omitted.",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Alice" },
          email: {
            type: "string",
            format: "email",
            example: "alice@example.com",
          },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      UserWithNoteCount: {
        allOf: [
          { $ref: "#/components/schemas/UserPublic" },
          {
            type: "object",
            properties: {
              _count: {
                type: "object",
                properties: {
                  notes: { type: "integer", example: 5 },
                },
              },
            },
          },
        ],
      },
      NoteAuthor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Alice" },
          email: {
            type: "string",
            format: "email",
            example: "alice@example.com",
          },
        },
      },
      Note: {
        type: "object",
        properties: {
          id: { type: "integer", example: 42 },
          title: { type: "string", example: "My First Note" },
          content: { type: "string", example: "This is the note body." },
          publish: { type: "boolean", example: true },
          userId: { type: "integer", example: 1 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          user: { $ref: "#/components/schemas/NoteAuthor" },
        },
      },
      PaginationMeta: {
        type: "object",
        properties: {
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalCount: { type: "integer", example: 57 },
          totalPages: { type: "integer", example: 6 },
        },
      },
      // ── Response envelopes ────────────────────────────────
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Operation successful." },
          data: {},
          //   meta: { $ref: "#/components/schemas/PaginationMeta", nullable: true },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Something went wrong." },
        },
      },
      // ── Request bodies ────────────────────────────────────
      SignUpRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Alice" },
          email: {
            type: "string",
            format: "email",
            example: "alice@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "secret123",
          },
        },
      },
      SignInRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "alice@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "secret123",
          },
        },
      },
      NoteBody: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: { type: "string", example: "My First Note" },
          content: { type: "string", example: "This is the note body." },
          publish: { type: "boolean", default: false, example: true },
        },
      },
    },
    // ── Reusable responses ────────────────────────────────────
    responses: {
      Unauthorized: {
        description:
          "Not authenticated — `authToken` cookie missing or invalid.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "Not authorized, no token" },
          },
        },
      },
      Forbidden: {
        description: "Authenticated but not permitted (e.g. not an admin).",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              success: false,
              message: "Forbidden: Admin access only.",
            },
          },
        },
      },
      NotFound: {
        description: "The requested resource was not found.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "Note Not Found." },
          },
        },
      },
      InternalError: {
        description: "Unexpected server error.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "Internal Server Error" },
          },
        },
      },
    },
    // ── Reusable parameters ───────────────────────────────────
    parameters: {
      noteId: {
        name: "noteId",
        in: "path",
        required: true,
        description: "The integer ID of the note.",
        schema: { type: "integer", example: 42 },
      },
      userId: {
        name: "userId",
        in: "path",
        required: true,
        description: "The integer ID of the user.",
        schema: { type: "integer", example: 7 },
      },
      page: {
        name: "page",
        in: "query",
        required: false,
        description: "Page number (1-indexed).",
        schema: { type: "integer", default: 1, example: 1 },
      },
      limit: {
        name: "limit",
        in: "query",
        required: false,
        description: "Number of items per page.",
        schema: { type: "integer", default: 10, example: 10 },
      },
    },
  },

  tags: [
    {
      name: "Auth",
      description: "Authentication — sign up, sign in, sign out, current user",
    },
    { name: "Notes", description: "Note CRUD operations" },
    { name: "Admin", description: "Admin-only platform management endpoints" },
  ],

  // ────────────────────────────────────────────────────────────
  // Paths
  // ────────────────────────────────────────────────────────────
  paths: {
    // ── Auth ─────────────────────────────────────────────────
    "/auth/sign-up": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        description:
          "Creates a new user account and sets the `authToken` HTTP-only cookie on success.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignUpRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/UserPublic" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "400": {
            description: "Validation error or user already exists.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { success: false, message: "User already exists" },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/auth/sign-in": {
      post: {
        tags: ["Auth"],
        summary: "Sign in",
        description:
          "Authenticates with email/password and sets the `authToken` HTTP-only cookie.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignInRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Signed in successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/UserPublic" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": {
            description: "Invalid credentials.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: {
                  success: false,
                  message: "Invalid email or password",
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/auth/sign-out": {
      delete: {
        tags: ["Auth"],
        summary: "Sign out",
        description: "Clears the `authToken` cookie server-side.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Signed out successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: { data: { nullable: true, example: null } },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user",
        description: "Returns the currently authenticated user's profile.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "User fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/UserPublic" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    // ── Notes ─────────────────────────────────────────────────
    "/note/": {
      get: {
        tags: ["Notes"],
        summary: "Get paginated notes",
        description:
          "Returns a paginated list of notes. Includes all published notes **plus** the authenticated user's own unpublished notes.",
        security: [{ cookieAuth: [] }],
        parameters: [
          { $ref: "#/components/parameters/page" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Notes fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Note" },
                        },
                        meta: { $ref: "#/components/schemas/PaginationMeta" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/note/{noteId}": {
      get: {
        tags: ["Notes"],
        summary: "Get a note by ID",
        description:
          "Returns a single note. If the note is unpublished, only the note owner can access it.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/noteId" }],
        responses: {
          "200": {
            description: "Note fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Note" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": {
            description:
              "Note exists but is not published and you are not the owner.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { success: false, message: "Note is not published" },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Notes"],
        summary: "Delete a note",
        description:
          "Permanently deletes a note. Only the note owner can delete their note.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/noteId" }],
        responses: {
          "200": {
            description: "Note deleted successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Note" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/note/create": {
      post: {
        tags: ["Notes"],
        summary: "Create a note",
        description: "Creates a new note belonging to the authenticated user.",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NoteBody" },
            },
          },
        },
        responses: {
          "201": {
            description: "Note created successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Note" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/note/update/{noteId}": {
      put: {
        tags: ["Notes"],
        summary: "Update a note",
        description:
          "Updates an existing note. Only the note owner is allowed.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/noteId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NoteBody" },
            },
          },
        },
        responses: {
          "200": {
            description: "Note updated successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Note" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    // ── Admin ─────────────────────────────────────────────────
    "/admin/stats": {
      get: {
        tags: ["Admin"],
        summary: "Get dashboard stats",
        description: "Returns total user and note counts. Admin only.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Stats fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            totalUsers: { type: "integer", example: 120 },
                            totalNotes: { type: "integer", example: 530 },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/admin/users": {
      get: {
        tags: ["Admin"],
        summary: "List all users",
        description:
          "Returns a paginated list of all registered users with note counts. Admin only.",
        security: [{ cookieAuth: [] }],
        parameters: [
          { $ref: "#/components/parameters/page" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Users fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/UserWithNoteCount",
                          },
                        },
                        meta: { $ref: "#/components/schemas/PaginationMeta" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/admin/user/{userId}": {
      delete: {
        tags: ["Admin"],
        summary: "Delete a user",
        description:
          "Permanently deletes a user account along with all their notes (cascade). Cannot delete another admin. Admin only.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/userId" }],
        responses: {
          "200": {
            description: "User and their notes deleted successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/UserPublic" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },

    "/admin/note/{noteId}": {
      delete: {
        tags: ["Admin"],
        summary: "Delete any note (admin)",
        description:
          "Allows an admin to permanently delete any note on the platform. Admin only.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/noteId" }],
        responses: {
          "200": {
            description: "Note deleted by admin successfully.",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Note" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
  },
};

export default swaggerSpec;
