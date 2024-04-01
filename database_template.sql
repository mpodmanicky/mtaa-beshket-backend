CREATE TABLE "images"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "url" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL
);


CREATE TABLE "chats"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "message" TEXT NOT NULL
);

CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
	"birth_date" DATE NOT NULL
);


CREATE TABLE "event_inventory"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_id" BIGINT NOT NULL,
    "birth_date" DATE NOT NULL,
    "event_id" BIGINT NOT NULL
);

CREATE TABLE "events"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "interpret" VARCHAR(32) NOT NULL,
    "place" VARCHAR(32) NOT NULL,
    "date" DATE NOT NULL,
    "price" BIGINT NOT NULL,
    "interpret_id" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "iamges" BIGINT NOT NULL
);

CREATE TABLE "messages"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "owner_id" BIGINT NOT NULL
);

CREATE TABLE "tickets"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "qr_code" bytea NOT NULL
);

ALTER TABLE
    "images" ADD CONSTRAINT "images_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "tickets" ADD CONSTRAINT "tickets_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_message_foreign" FOREIGN KEY("message") REFERENCES "messages"("id");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "event_inventory" ADD CONSTRAINT "event_inventory_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "tickets" ADD CONSTRAINT "tickets_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_iamges_foreign" FOREIGN KEY("iamges") REFERENCES "images"("id");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "event_inventory" ADD CONSTRAINT "event_inventory_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");