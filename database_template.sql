CREATE TABLE "images"(
    "id" UUID PRIMARY KEY NOT NULL,
    "url" TEXT NOT NULL,
    "event_id" UUID,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);


CREATE TABLE "chats"(
    "id" UUID PRIMARY KEY NOT NULL,
    "owner_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "name" varchar(32) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);


CREATE TABLE "users"(
    "id" UUID PRIMARY KEY NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
	"image_id" UUID,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" BYTEA NOT NULL,
	"born_at" DATE NOT NULL,
	"isInterpret" bool NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);


CREATE TABLE "events"(
    "id" UUID PRIMARY KEY NOT NULL,
    "name" VARCHAR(100) NOT NULL,
	"image_id" UUID,
    "interpret_id" UUID NOT NULL,
    "place" VARCHAR(100) NOT NULL,
    "date" DATE NOT NULL,
    "price" DECIMAL NOT NULL,
    "detail" TEXT NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);


CREATE TABLE "messages"(
    "id" UUID PRIMARY KEY NOT NULL,
    "owner_id" UUID NOT NULL,
	"chat_id" UUID NOT NULL,
	"text" TEXT NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);


CREATE TABLE "tickets"(
    "id" UUID PRIMARY KEY NOT NULL,
    "owner_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "qr_code" BYTEA NOT NULL,
	"privilege" TEXT,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone 
);

ALTER TABLE tickets ADD FOREIGN KEY(owner_id) REFERENCES users(id);
ALTER TABLE tickets ADD FOREIGN KEY(event_id) REFERENCES events(id);


ALTER TABLE images ADD FOREIGN KEY(event_id) REFERENCES events(id); 

ALTER TABLE chats ADD FOREIGN KEY(event_id) REFERENCES events(id);
ALTER TABLE chats ADD FOREIGN KEY(owner_id) REFERENCES users(id);

ALTER TABLE users ADD FOREIGN KEY(image_id) REFERENCES images(id);

ALTER TABLE events ADD FOREIGN KEY(image_id) REFERENCES images(id);
ALTER TABLE events ADD FOREIGN KEY(interpret_id) REFERENCES users(id);

ALTER TABLE messages ADD FOREIGN KEY(owner_id) REFERENCES users(id);
ALTER TABLE messages ADD FOREIGN KEY(chat_id) REFERENCES chats(id);

