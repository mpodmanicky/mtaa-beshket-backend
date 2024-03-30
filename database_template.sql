CREATE TABLE "images"(
    "id" BIGINT NOT NULL,
    "url" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL
);
ALTER TABLE
    "images" ADD PRIMARY KEY("id");
CREATE TABLE "chats"(
    "id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "message" TEXT NOT NULL
);
ALTER TABLE
    "chats" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "event_inventory"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL
);
ALTER TABLE
    "event_inventory" ADD PRIMARY KEY("id");
CREATE TABLE "events"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "interpret" VARCHAR(32) NOT NULL,
    "place" VARCHAR(32) NOT NULL,
    "date" DATE NOT NULL,
    "price" BIGINT NOT NULL,
    "interpret_id" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "iamges" BIGINT NOT NULL
);
ALTER TABLE
    "events" ADD PRIMARY KEY("id");
CREATE TABLE "messages"(
    "id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
CREATE TABLE "tickets"(
    "id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "qr_code" bytea NOT NULL
);
ALTER TABLE
    "tickets" ADD PRIMARY KEY("id");
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