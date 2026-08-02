var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// src/middlewares/globalErrorHandler.ts
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

// generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  description String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  properties Property[]\n}\n\nenum PaymentProvider {\n  STRIPE\n  SSLCOMMERZ\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n}\n\nmodel Payment {\n  id            String          @id @default(uuid())\n  transactionId String?         @unique\n  amount        Float\n  method        String?\n  provider      PaymentProvider @default(STRIPE)\n  status        PaymentStatus   @default(PENDING)\n  paidAt        DateTime?\n  createdAt     DateTime        @default(now())\n  updatedAt     DateTime        @updatedAt\n\n  rentalRequestId String        @unique\n  rentalRequest   RentalRequest @relation(fields: [rentalRequestId], references: [id])\n}\n\nmodel Property {\n  id          String   @id @default(uuid())\n  title       String\n  description String\n  address     String\n  price       Float\n  isAvailable Boolean  @default(true)\n  images      String[]\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  landlordId String\n  landlord   User   @relation(fields: [landlordId], references: [id])\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  rentalRequests RentalRequest[]\n}\n\nenum RentalStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  ACTIVE\n  COMPLETED\n  CANCELLED\n}\n\nmodel RentalRequest {\n  id         String       @id @default(uuid())\n  status     RentalStatus @default(PENDING)\n  message    String?\n  moveInDate DateTime\n  createdAt  DateTime     @default(now())\n  updatedAt  DateTime     @updatedAt\n\n  tenantId String\n  tenant   User   @relation(fields: [tenantId], references: [id])\n\n  propertyId String\n  property   Property @relation(fields: [propertyId], references: [id])\n\n  payment Payment?\n  review  Review?\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  rentalRequestId String        @unique\n  rentalRequest   RentalRequest @relation(fields: [rentalRequestId], references: [id])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  ADMIN\n  LANDLORD\n  TENANT\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  name      String\n  email     String   @unique\n  password  String\n  phone     String?\n  role      Role     @default(TENANT)\n  isBanned  Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  properties     Property[]\n  rentalRequests RentalRequest[]\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"properties","kind":"object","type":"Property","relationName":"CategoryToProperty"}],"dbName":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"method","kind":"scalar","type":"String"},{"name":"provider","kind":"enum","type":"PaymentProvider"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"rentalRequestId","kind":"scalar","type":"String"},{"name":"rentalRequest","kind":"object","type":"RentalRequest","relationName":"PaymentToRentalRequest"}],"dbName":null},"Property":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"images","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"landlordId","kind":"scalar","type":"String"},{"name":"landlord","kind":"object","type":"User","relationName":"PropertyToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProperty"},{"name":"rentalRequests","kind":"object","type":"RentalRequest","relationName":"PropertyToRentalRequest"}],"dbName":null},"RentalRequest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"RentalStatus"},{"name":"message","kind":"scalar","type":"String"},{"name":"moveInDate","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tenantId","kind":"scalar","type":"String"},{"name":"tenant","kind":"object","type":"User","relationName":"RentalRequestToUser"},{"name":"propertyId","kind":"scalar","type":"String"},{"name":"property","kind":"object","type":"Property","relationName":"PropertyToRentalRequest"},{"name":"payment","kind":"object","type":"Payment","relationName":"PaymentToRentalRequest"},{"name":"review","kind":"object","type":"Review","relationName":"RentalRequestToReview"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"rentalRequestId","kind":"scalar","type":"String"},{"name":"rentalRequest","kind":"object","type":"RentalRequest","relationName":"RentalRequestToReview"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"properties","kind":"object","type":"Property","relationName":"PropertyToUser"},{"name":"rentalRequests","kind":"object","type":"RentalRequest","relationName":"RentalRequestToUser"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","properties","tenant","property","rentalRequest","payment","review","rentalRequests","_count","landlord","category","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","data","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","create","update","Category.upsertOne","Category.deleteOne","Category.deleteMany","having","_min","_max","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","_avg","_sum","Payment.groupBy","Payment.aggregate","Property.findUnique","Property.findUniqueOrThrow","Property.findFirst","Property.findFirstOrThrow","Property.findMany","Property.createOne","Property.createMany","Property.createManyAndReturn","Property.updateOne","Property.updateMany","Property.updateManyAndReturn","Property.upsertOne","Property.deleteOne","Property.deleteMany","Property.groupBy","Property.aggregate","RentalRequest.findUnique","RentalRequest.findUniqueOrThrow","RentalRequest.findFirst","RentalRequest.findFirstOrThrow","RentalRequest.findMany","RentalRequest.createOne","RentalRequest.createMany","RentalRequest.createManyAndReturn","RentalRequest.updateOne","RentalRequest.updateMany","RentalRequest.updateManyAndReturn","RentalRequest.upsertOne","RentalRequest.deleteOne","RentalRequest.deleteMany","RentalRequest.groupBy","RentalRequest.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","phone","Role","role","isBanned","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","rating","comment","rentalRequestId","RentalStatus","status","message","moveInDate","tenantId","propertyId","title","description","address","price","isAvailable","images","landlordId","categoryId","has","hasEvery","hasSome","transactionId","amount","method","PaymentProvider","provider","PaymentStatus","paidAt","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "_gI6YAkDAAC5AQAgdQAA2gEAMHYAABYAEHcAANoBADB4AQAAAAF5AQAAAAGAAUAAuAEAIYEBQAC4AQAhmgEBALUBACEBAAAAAQAgEQkAALoBACALAADdAQAgDAAA4gEAIHUAAOEBADB2AAADABB3AADhAQAweAEAtAEAIYABQAC4AQAhgQFAALgBACGZAQEAtAEAIZoBAQC0AQAhmwEBALQBACGcAQgA1QEAIZ0BIAC3AQAhngEAAMgBACCfAQEAtAEAIaABAQC0AQAhAwkAALACACALAADYAgAgDAAA3AIAIBEJAAC6AQAgCwAA3QEAIAwAAOIBACB1AADhAQAwdgAAAwAQdwAA4QEAMHgBAAAAAYABQAC4AQAhgQFAALgBACGZAQEAtAEAIZoBAQC0AQAhmwEBALQBACGcAQgA1QEAIZ0BIAC3AQAhngEAAMgBACCfAQEAtAEAIaABAQC0AQAhAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAPBAAA3QEAIAUAAN4BACAHAADfAQAgCAAA4AEAIHUAANsBADB2AAAIABB3AADbAQAweAEAtAEAIYABQAC4AQAhgQFAALgBACGUAQAA3AGUASKVAQEAtQEAIZYBQAC4AQAhlwEBALQBACGYAQEAtAEAIQUEAADYAgAgBQAA2QIAIAcAANoCACAIAADbAgAglQEAAOMBACAPBAAA3QEAIAUAAN4BACAHAADfAQAgCAAA4AEAIHUAANsBADB2AAAIABB3AADbAQAweAEAAAABgAFAALgBACGBAUAAuAEAIZQBAADcAZQBIpUBAQC1AQAhlgFAALgBACGXAQEAtAEAIZgBAQC0AQAhAwAAAAgAIAEAAAkAMAIAAAoAIA4GAADBAQAgdQAA1AEAMHYAAAwAEHcAANQBADB4AQC0AQAhgAFAALgBACGBAUAAuAEAIZIBAQC0AQAhlAEAANcBqgEipAEBALUBACGlAQgA1QEAIaYBAQC1AQAhqAEAANYBqAEiqgFAANgBACEBAAAADAAgCgYAAMEBACB1AAC_AQAwdgAADgAQdwAAvwEAMHgBALQBACGAAUAAuAEAIYEBQAC4AQAhkAECAMABACGRAQEAtQEAIZIBAQC0AQAhAQAAAA4AIAEAAAADACABAAAACAAgAwAAAAgAIAEAAAkAMAIAAAoAIAEAAAAIACABAAAAAwAgAQAAAAEAIAkDAAC5AQAgdQAA2gEAMHYAABYAEHcAANoBADB4AQC0AQAheQEAtAEAIYABQAC4AQAhgQFAALgBACGaAQEAtQEAIQIDAACvAgAgmgEAAOMBACADAAAAFgAgAQAAFwAwAgAAAQAgAwAAABYAIAEAABcAMAIAAAEAIAMAAAAWACABAAAXADACAAABACAGAwAA1wIAIHgBAAAAAXkBAAAAAYABQAAAAAGBAUAAAAABmgEBAAAAAQESAAAbACAFeAEAAAABeQEAAAABgAFAAAAAAYEBQAAAAAGaAQEAAAABARIAAB0AMAESAAAdADAGAwAAzQIAIHgBAOcBACF5AQDnAQAhgAFAAOsBACGBAUAA6wEAIZoBAQDoAQAhAgAAAAEAIBIAACAAIAV4AQDnAQAheQEA5wEAIYABQADrAQAhgQFAAOsBACGaAQEA6AEAIQIAAAAWACASAAAiACACAAAAFgAgEgAAIgAgAwAAAAEAIBkAABsAIBoAACAAIAEAAAABACABAAAAFgAgBAoAAMoCACAfAADMAgAgIAAAywIAIJoBAADjAQAgCHUAANkBADB2AAApABB3AADZAQAweAEAogEAIXkBAKIBACGAAUAApgEAIYEBQACmAQAhmgEBAKMBACEDAAAAFgAgAQAAKAAwHgAAKQAgAwAAABYAIAEAABcAMAIAAAEAIA4GAADBAQAgdQAA1AEAMHYAAAwAEHcAANQBADB4AQAAAAGAAUAAuAEAIYEBQAC4AQAhkgEBAAAAAZQBAADXAaoBIqQBAQAAAAGlAQgA1QEAIaYBAQC1AQAhqAEAANYBqAEiqgFAANgBACEBAAAALAAgAQAAACwAIAQGAAC4AgAgpAEAAOMBACCmAQAA4wEAIKoBAADjAQAgAwAAAAwAIAEAAC8AMAIAACwAIAMAAAAMACABAAAvADACAAAsACADAAAADAAgAQAALwAwAgAALAAgCwYAAMkCACB4AQAAAAGAAUAAAAABgQFAAAAAAZIBAQAAAAGUAQAAAKoBAqQBAQAAAAGlAQgAAAABpgEBAAAAAagBAAAAqAECqgFAAAAAAQESAAAzACAKeAEAAAABgAFAAAAAAYEBQAAAAAGSAQEAAAABlAEAAACqAQKkAQEAAAABpQEIAAAAAaYBAQAAAAGoAQAAAKgBAqoBQAAAAAEBEgAANQAwARIAADUAMAsGAADIAgAgeAEA5wEAIYABQADrAQAhgQFAAOsBACGSAQEA5wEAIZQBAACKAqoBIqQBAQDoAQAhpQEIAIgCACGmAQEA6AEAIagBAACJAqgBIqoBQACLAgAhAgAAACwAIBIAADgAIAp4AQDnAQAhgAFAAOsBACGBAUAA6wEAIZIBAQDnAQAhlAEAAIoCqgEipAEBAOgBACGlAQgAiAIAIaYBAQDoAQAhqAEAAIkCqAEiqgFAAIsCACECAAAADAAgEgAAOgAgAgAAAAwAIBIAADoAIAMAAAAsACAZAAAzACAaAAA4ACABAAAALAAgAQAAAAwAIAgKAADDAgAgHwAAxgIAICAAAMUCACAxAADEAgAgMgAAxwIAIKQBAADjAQAgpgEAAOMBACCqAQAA4wEAIA11AADKAQAwdgAAQQAQdwAAygEAMHgBAKIBACGAAUAApgEAIYEBQACmAQAhkgEBAKIBACGUAQAAzAGqASKkAQEAowEAIaUBCADHAQAhpgEBAKMBACGoAQAAywGoASKqAUAAzQEAIQMAAAAMACABAABAADAeAABBACADAAAADAAgAQAALwAwAgAALAAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAOCQAArAIAIAsAAMICACAMAACrAgAgeAEAAAABgAFAAAAAAYEBQAAAAAGZAQEAAAABmgEBAAAAAZsBAQAAAAGcAQgAAAABnQEgAAAAAZ4BAACqAgAgnwEBAAAAAaABAQAAAAEBEgAASQAgC3gBAAAAAYABQAAAAAGBAUAAAAABmQEBAAAAAZoBAQAAAAGbAQEAAAABnAEIAAAAAZ0BIAAAAAGeAQAAqgIAIJ8BAQAAAAGgAQEAAAABARIAAEsAMAESAABLADAOCQAAnQIAIAsAAMECACAMAACcAgAgeAEA5wEAIYABQADrAQAhgQFAAOsBACGZAQEA5wEAIZoBAQDnAQAhmwEBAOcBACGcAQgAiAIAIZ0BIADqAQAhngEAAJoCACCfAQEA5wEAIaABAQDnAQAhAgAAAAUAIBIAAE4AIAt4AQDnAQAhgAFAAOsBACGBAUAA6wEAIZkBAQDnAQAhmgEBAOcBACGbAQEA5wEAIZwBCACIAgAhnQEgAOoBACGeAQAAmgIAIJ8BAQDnAQAhoAEBAOcBACECAAAAAwAgEgAAUAAgAgAAAAMAIBIAAFAAIAMAAAAFACAZAABJACAaAABOACABAAAABQAgAQAAAAMAIAUKAAC8AgAgHwAAvwIAICAAAL4CACAxAAC9AgAgMgAAwAIAIA51AADGAQAwdgAAVwAQdwAAxgEAMHgBAKIBACGAAUAApgEAIYEBQACmAQAhmQEBAKIBACGaAQEAogEAIZsBAQCiAQAhnAEIAMcBACGdASAApQEAIZ4BAADIAQAgnwEBAKIBACGgAQEAogEAIQMAAAADACABAABWADAeAABXACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAoAIAEAAAAKACADAAAACAAgAQAACQAwAgAACgAgAwAAAAgAIAEAAAkAMAIAAAoAIAMAAAAIACABAAAJADACAAAKACAMBAAAqAIAIAUAAI0CACAHAACOAgAgCAAAjwIAIHgBAAAAAYABQAAAAAGBAUAAAAABlAEAAACUAQKVAQEAAAABlgFAAAAAAZcBAQAAAAGYAQEAAAABARIAAF8AIAh4AQAAAAGAAUAAAAABgQFAAAAAAZQBAAAAlAEClQEBAAAAAZYBQAAAAAGXAQEAAAABmAEBAAAAAQESAABhADABEgAAYQAwDAQAAKYCACAFAAD6AQAgBwAA-wEAIAgAAPwBACB4AQDnAQAhgAFAAOsBACGBAUAA6wEAIZQBAAD4AZQBIpUBAQDoAQAhlgFAAOsBACGXAQEA5wEAIZgBAQDnAQAhAgAAAAoAIBIAAGQAIAh4AQDnAQAhgAFAAOsBACGBAUAA6wEAIZQBAAD4AZQBIpUBAQDoAQAhlgFAAOsBACGXAQEA5wEAIZgBAQDnAQAhAgAAAAgAIBIAAGYAIAIAAAAIACASAABmACADAAAACgAgGQAAXwAgGgAAZAAgAQAAAAoAIAEAAAAIACAECgAAuQIAIB8AALsCACAgAAC6AgAglQEAAOMBACALdQAAwgEAMHYAAG0AEHcAAMIBADB4AQCiAQAhgAFAAKYBACGBAUAApgEAIZQBAADDAZQBIpUBAQCjAQAhlgFAAKYBACGXAQEAogEAIZgBAQCiAQAhAwAAAAgAIAEAAGwAMB4AAG0AIAMAAAAIACABAAAJADACAAAKACAKBgAAwQEAIHUAAL8BADB2AAAOABB3AAC_AQAweAEAAAABgAFAALgBACGBAUAAuAEAIZABAgDAAQAhkQEBALUBACGSAQEAAAABAQAAAHAAIAEAAABwACACBgAAuAIAIJEBAADjAQAgAwAAAA4AIAEAAHMAMAIAAHAAIAMAAAAOACABAABzADACAABwACADAAAADgAgAQAAcwAwAgAAcAAgBwYAALcCACB4AQAAAAGAAUAAAAABgQFAAAAAAZABAgAAAAGRAQEAAAABkgEBAAAAAQESAAB3ACAGeAEAAAABgAFAAAAAAYEBQAAAAAGQAQIAAAABkQEBAAAAAZIBAQAAAAEBEgAAeQAwARIAAHkAMAcGAAC2AgAgeAEA5wEAIYABQADrAQAhgQFAAOsBACGQAQIAggIAIZEBAQDoAQAhkgEBAOcBACECAAAAcAAgEgAAfAAgBngBAOcBACGAAUAA6wEAIYEBQADrAQAhkAECAIICACGRAQEA6AEAIZIBAQDnAQAhAgAAAA4AIBIAAH4AIAIAAAAOACASAAB-ACADAAAAcAAgGQAAdwAgGgAAfAAgAQAAAHAAIAEAAAAOACAGCgAAsQIAIB8AALQCACAgAACzAgAgMQAAsgIAIDIAALUCACCRAQAA4wEAIAl1AAC7AQAwdgAAhQEAEHcAALsBADB4AQCiAQAhgAFAAKYBACGBAUAApgEAIZABAgC8AQAhkQEBAKMBACGSAQEAogEAIQMAAAAOACABAACEAQAwHgAAhQEAIAMAAAAOACABAABzADACAABwACAOAwAAuQEAIAkAALoBACB1AACzAQAwdgAAiwEAEHcAALMBADB4AQAAAAF5AQC0AQAhegEAAAABewEAtAEAIXwBALUBACF-AAC2AX4ifyAAtwEAIYABQAC4AQAhgQFAALgBACEBAAAAiAEAIAEAAACIAQAgDgMAALkBACAJAAC6AQAgdQAAswEAMHYAAIsBABB3AACzAQAweAEAtAEAIXkBALQBACF6AQC0AQAhewEAtAEAIXwBALUBACF-AAC2AX4ifyAAtwEAIYABQAC4AQAhgQFAALgBACEDAwAArwIAIAkAALACACB8AADjAQAgAwAAAIsBACABAACMAQAwAgAAiAEAIAMAAACLAQAgAQAAjAEAMAIAAIgBACADAAAAiwEAIAEAAIwBADACAACIAQAgCwMAAK0CACAJAACuAgAgeAEAAAABeQEAAAABegEAAAABewEAAAABfAEAAAABfgAAAH4CfyAAAAABgAFAAAAAAYEBQAAAAAEBEgAAkAEAIAl4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF-AAAAfgJ_IAAAAAGAAUAAAAABgQFAAAAAAQESAACSAQAwARIAAJIBADALAwAA7AEAIAkAAO0BACB4AQDnAQAheQEA5wEAIXoBAOcBACF7AQDnAQAhfAEA6AEAIX4AAOkBfiJ_IADqAQAhgAFAAOsBACGBAUAA6wEAIQIAAACIAQAgEgAAlQEAIAl4AQDnAQAheQEA5wEAIXoBAOcBACF7AQDnAQAhfAEA6AEAIX4AAOkBfiJ_IADqAQAhgAFAAOsBACGBAUAA6wEAIQIAAACLAQAgEgAAlwEAIAIAAACLAQAgEgAAlwEAIAMAAACIAQAgGQAAkAEAIBoAAJUBACABAAAAiAEAIAEAAACLAQAgBAoAAOQBACAfAADmAQAgIAAA5QEAIHwAAOMBACAMdQAAoQEAMHYAAJ4BABB3AAChAQAweAEAogEAIXkBAKIBACF6AQCiAQAhewEAogEAIXwBAKMBACF-AACkAX4ifyAApQEAIYABQACmAQAhgQFAAKYBACEDAAAAiwEAIAEAAJ0BADAeAACeAQAgAwAAAIsBACABAACMAQAwAgAAiAEAIAx1AAChAQAwdgAAngEAEHcAAKEBADB4AQCiAQAheQEAogEAIXoBAKIBACF7AQCiAQAhfAEAowEAIX4AAKQBfiJ_IAClAQAhgAFAAKYBACGBAUAApgEAIQ4KAACoAQAgHwAAsgEAICAAALIBACCCAQEAAAABgwEBAAAABIQBAQAAAASFAQEAAAABhgEBAAAAAYcBAQAAAAGIAQEAAAABiQEBALEBACGKAQEAAAABiwEBAAAAAYwBAQAAAAEOCgAArwEAIB8AALABACAgAACwAQAgggEBAAAAAYMBAQAAAAWEAQEAAAAFhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBAQCuAQAhigEBAAAAAYsBAQAAAAGMAQEAAAABBwoAAKgBACAfAACtAQAgIAAArQEAIIIBAAAAfgKDAQAAAH4IhAEAAAB-CIkBAACsAX4iBQoAAKgBACAfAACrAQAgIAAAqwEAIIIBIAAAAAGJASAAqgEAIQsKAACoAQAgHwAAqQEAICAAAKkBACCCAUAAAAABgwFAAAAABIQBQAAAAASFAUAAAAABhgFAAAAAAYcBQAAAAAGIAUAAAAABiQFAAKcBACELCgAAqAEAIB8AAKkBACAgAACpAQAgggFAAAAAAYMBQAAAAASEAUAAAAAEhQFAAAAAAYYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQACnAQAhCIIBAgAAAAGDAQIAAAAEhAECAAAABIUBAgAAAAGGAQIAAAABhwECAAAAAYgBAgAAAAGJAQIAqAEAIQiCAUAAAAABgwFAAAAABIQBQAAAAASFAUAAAAABhgFAAAAAAYcBQAAAAAGIAUAAAAABiQFAAKkBACEFCgAAqAEAIB8AAKsBACAgAACrAQAgggEgAAAAAYkBIACqAQAhAoIBIAAAAAGJASAAqwEAIQcKAACoAQAgHwAArQEAICAAAK0BACCCAQAAAH4CgwEAAAB-CIQBAAAAfgiJAQAArAF-IgSCAQAAAH4CgwEAAAB-CIQBAAAAfgiJAQAArQF-Ig4KAACvAQAgHwAAsAEAICAAALABACCCAQEAAAABgwEBAAAABYQBAQAAAAWFAQEAAAABhgEBAAAAAYcBAQAAAAGIAQEAAAABiQEBAK4BACGKAQEAAAABiwEBAAAAAYwBAQAAAAEIggECAAAAAYMBAgAAAAWEAQIAAAAFhQECAAAAAYYBAgAAAAGHAQIAAAABiAECAAAAAYkBAgCvAQAhC4IBAQAAAAGDAQEAAAAFhAEBAAAABYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAsAEAIYoBAQAAAAGLAQEAAAABjAEBAAAAAQ4KAACoAQAgHwAAsgEAICAAALIBACCCAQEAAAABgwEBAAAABIQBAQAAAASFAQEAAAABhgEBAAAAAYcBAQAAAAGIAQEAAAABiQEBALEBACGKAQEAAAABiwEBAAAAAYwBAQAAAAELggEBAAAAAYMBAQAAAASEAQEAAAAEhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBAQCyAQAhigEBAAAAAYsBAQAAAAGMAQEAAAABDgMAALkBACAJAAC6AQAgdQAAswEAMHYAAIsBABB3AACzAQAweAEAtAEAIXkBALQBACF6AQC0AQAhewEAtAEAIXwBALUBACF-AAC2AX4ifyAAtwEAIYABQAC4AQAhgQFAALgBACELggEBAAAAAYMBAQAAAASEAQEAAAAEhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBAQCyAQAhigEBAAAAAYsBAQAAAAGMAQEAAAABC4IBAQAAAAGDAQEAAAAFhAEBAAAABYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQEAsAEAIYoBAQAAAAGLAQEAAAABjAEBAAAAAQSCAQAAAH4CgwEAAAB-CIQBAAAAfgiJAQAArQF-IgKCASAAAAABiQEgAKsBACEIggFAAAAAAYMBQAAAAASEAUAAAAAEhQFAAAAAAYYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQACpAQAhA40BAAADACCOAQAAAwAgjwEAAAMAIAONAQAACAAgjgEAAAgAII8BAAAIACAJdQAAuwEAMHYAAIUBABB3AAC7AQAweAEAogEAIYABQACmAQAhgQFAAKYBACGQAQIAvAEAIZEBAQCjAQAhkgEBAKIBACENCgAAqAEAIB8AAKgBACAgAACoAQAgMQAAvgEAIDIAAKgBACCCAQIAAAABgwECAAAABIQBAgAAAASFAQIAAAABhgECAAAAAYcBAgAAAAGIAQIAAAABiQECAL0BACENCgAAqAEAIB8AAKgBACAgAACoAQAgMQAAvgEAIDIAAKgBACCCAQIAAAABgwECAAAABIQBAgAAAASFAQIAAAABhgECAAAAAYcBAgAAAAGIAQIAAAABiQECAL0BACEIggEIAAAAAYMBCAAAAASEAQgAAAAEhQEIAAAAAYYBCAAAAAGHAQgAAAABiAEIAAAAAYkBCAC-AQAhCgYAAMEBACB1AAC_AQAwdgAADgAQdwAAvwEAMHgBALQBACGAAUAAuAEAIYEBQAC4AQAhkAECAMABACGRAQEAtQEAIZIBAQC0AQAhCIIBAgAAAAGDAQIAAAAEhAECAAAABIUBAgAAAAGGAQIAAAABhwECAAAAAYgBAgAAAAGJAQIAqAEAIREEAADdAQAgBQAA3gEAIAcAAN8BACAIAADgAQAgdQAA2wEAMHYAAAgAEHcAANsBADB4AQC0AQAhgAFAALgBACGBAUAAuAEAIZQBAADcAZQBIpUBAQC1AQAhlgFAALgBACGXAQEAtAEAIZgBAQC0AQAhqwEAAAgAIKwBAAAIACALdQAAwgEAMHYAAG0AEHcAAMIBADB4AQCiAQAhgAFAAKYBACGBAUAApgEAIZQBAADDAZQBIpUBAQCjAQAhlgFAAKYBACGXAQEAogEAIZgBAQCiAQAhBwoAAKgBACAfAADFAQAgIAAAxQEAIIIBAAAAlAECgwEAAACUAQiEAQAAAJQBCIkBAADEAZQBIgcKAACoAQAgHwAAxQEAICAAAMUBACCCAQAAAJQBAoMBAAAAlAEIhAEAAACUAQiJAQAAxAGUASIEggEAAACUAQKDAQAAAJQBCIQBAAAAlAEIiQEAAMUBlAEiDnUAAMYBADB2AABXABB3AADGAQAweAEAogEAIYABQACmAQAhgQFAAKYBACGZAQEAogEAIZoBAQCiAQAhmwEBAKIBACGcAQgAxwEAIZ0BIAClAQAhngEAAMgBACCfAQEAogEAIaABAQCiAQAhDQoAAKgBACAfAAC-AQAgIAAAvgEAIDEAAL4BACAyAAC-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_AQAweAEAtAEAIYABQAC4AQAhgQFAALgBACGQAQIAwAEAIZEBAQC1AQAhkgEBALQBACGrAQAADgAgrAEAAA4AIBEJAAC6AQAgCwAA3QEAIAwAAOIBACB1AADhAQAwdgAAAwAQdwAA4QEAMHgBALQBACGAAUAAuAEAIYEBQAC4AQAhmQEBALQBACGaAQEAtAEAIZsBAQC0AQAhnAEIANUBACGdASAAtwEAIZ4BAADIAQAgnwEBALQBACGgAQEAtAEAIQsDAAC5AQAgdQAA2gEAMHYAABYAEHcAANoBADB4AQC0AQAheQEAtAEAIYABQAC4AQAhgQFAALgBACGaAQEAtQEAIasBAAAWACCsAQAAFgAgAAAAAAGwAQEAAAABAbABAQAAAAEBsAEAAAB-AgGwASAAAAABAbABQAAAAAELGQAAkAIAMBoAAJUCADCtAQAAkQIAMK4BAACSAgAwrwEAAJMCACCwAQAAlAIAMLEBAACUAgAwsgEAAJQCADCzAQAAlAIAMLQBAACWAgAwtQEAAJcCADALGQAA7gEAMBoAAPMBADCtAQAA7wEAMK4BAADwAQAwrwEAAPEBACCwAQAA8gEAMLEBAADyAQAwsgEAAPIBADCzAQAA8gEAMLQBAAD0AQAwtQEAAPUBADAKBQAAjQIAIAcAAI4CACAIAACPAgAgeAEAAAABgAFAAAAAAYEBQAAAAAGUAQAAAJQBApUBAQAAAAGWAUAAAAABmAEBAAAAAQIAAAAKACAZAACMAgAgAwAAAAoAIBkAAIwCACAaAAD5AQAgARIAAP4CADAPBAAA3QEAIAUAAN4BACAHAADfAQAgCAAA4AEAIHUAANsBADB2AAAIABB3AADbAQAweAEAAAABgAFAALgBACGBAUAAuAEAIZQBAADcAZQBIpUBAQC1AQAhlgFAALgBACGXAQEAtAEAIZgBAQC0AQAhAgAAAAoAIBIAAPkBACACAAAA9gEAIBIAAPcBACALdQAA9QEAMHYAAPYBABB3AAD1AQAweAEAtAEAIYABQAC4AQAhgQFAALgBACGUAQAA3AGUASKVAQEAtQEAIZYBQAC4AQAhlwEBALQBACGYAQEAtAEAIQt1AAD1AQAwdgAA9gEAEHcAAPUBADB4AQC0AQAhgAFAALgBACGBAUAAuAEAIZQBAADcAZQBIpUBAQC1AQAhlgFAALgBACGXAQEAtAEAIZgBAQC0AQAhB3gBAOcBACGAAUAA6wEAIYEBQADrAQAhlAEAAPgBlAEilQEBAOgBACGWAUAA6wEAIZgBAQDnAQAhAbABAAAAlAECCgUAAPoBACAHAAD7AQAgCAAA_AEAIHgBAOcBACGAAUAA6wEAIYEBQADrAQAhlAEAAPgBlAEilQEBAOgBACGWAUAA6wEAIZgBAQDnAQAhBRkAAPkCACAaAAD8AgAgrQEAAPoCACCuAQAA-wIAILMBAAAFACAHGQAAgwIAIBoAAIYCACCtAQAAhAIAIK4BAACFAgAgsQEAAAwAILIBAAAMACCzAQAALAAgBxkAAP0BACAaAACAAgAgrQEAAP4BACCuAQAA_wEAILEBAAAOACCyAQAADgAgswEAAHAAIAV4AQAAAAGAAUAAAAABgQFAAAAAAZABAgAAAAGRAQEAAAABAgAAAHAAIBkAAP0BACADAAAADgAgGQAA_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_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_IADqAQAhgAFAAOsBACGBAUAA6wEAIQsEAACoAgAgBQAAjQIAIAcAAI4CACB4AQAAAAGAAUAAAAABgQFAAAAAAZQBAAAAlAEClQEBAAAAAZYBQAAAAAGXAQEAAAABmAEBAAAAAQIAAAAKACAZAADoAgAgAwAAAAgAIBkAAOgCACAaAADsAgAgDQAAAAgAIAQAAKYCACAFAAD6AQAgBwAA-wEAIBIAAOwCACB4AQDnAQAhgAFAAOsBACGBAUAA6wEAIZQBAAD4AZQBIpUBAQDoAQAhlgFAAOsBACGXAQEA5wEAIZgBAQDnAQAhCwQAAKYCACAFAAD6AQAgBwAA-wEAIHgBAOcBACGAAUAA6wEAIYEBQADrAQAhlAEAAPgBlAEilQEBAOgBACGWAUAA6wEAIZcBAQDnAQAhmAEBAOcBACEFeAEAAAABeQEAAAABgAFAAAAAAYEBQAAAAAGaAQEAAAABAgAAAAEAIBkAAO0CACAKAwAArQIAIHgBAAAAAXkBAAAAAXoBAAAAAXsBAAAAAXwBAAAAAX4AAAB-An8gAAAAAYABQAAAAAGBAUAAAAABAgAAAIgBACAZAADvAgAgAwAAAIsBACAZAADvAgAgGgAA8wIAIAwAAACLAQAgAwAA7AEAIBIAAPMCACB4AQDnAQAheQEA5wEAIXoBAOcBACF7AQDnAQAhfAEA6AEAIX4AAOkBfiJ_IADqAQAhgAFAAOsBACGBAUAA6wEAIQoDAADsAQAgeAEA5wEAIXkBAOcBACF6AQDnAQAhewEA5wEAIXwBAOgBACF-AADpAX4ifyAA6gEAIYABQADrAQAhgQFAAOsBACEHeAEAAAABgAFAAAAAAYEBQAAAAAGUAQAAAJQBApUBAQAAAAGWAUAAAAABlwEBAAAAAQMAAAAWACAZAADtAgAgGgAA9wIAIAcAAAAWACASAAD3AgAgeAEA5wEAIXkBAOcBACGAAUAA6wEAIYEBQADrAQAhmgEBAOgBACEFeAEA5wEAIXkBAOcBACGAAUAA6wEAIYEBQADrAQAhmgEBAOgBACEKeAEAAAABgAFAAAAAAYEBQAAAAAGZAQEAAAABmgEBAAAAAZsBAQAAAAGcAQgAAAABnQEgAAAAAZ4BAACqAgAgoAEBAAAAAQ0LAADCAgAgDAAAqwIAIHgBAAAAAYABQAAAAAGBAUAAAAABmQEBAAAAAZoBAQAAAAGbAQEAAAABnAEIAAAAAZ0BIAAAAAGeAQAAqgIAIJ8BAQAAAAGgAQEAAAABAgAAAAUAIBkAAPkCACADAAAAAwAgGQAA-QIAIBoAAP0CACAPAAAAAwAgCwAAwQIAIAwAAJwCACASAAD9AgAgeAEA5wEAIYABQADrAQAhgQFAAOsBACGZAQEA5wEAIZoBAQDnAQAhmwEBAOcBACGcAQgAiAIAIZ0BIADqAQAhngEAAJoCACCfAQEA5wEAIaABAQDnAQAhDQsAAMECACAMAACcAgAgeAEA5wEAIYABQADrAQAhgQFAAOsBACGZAQEA5wEAIZoBAQDnAQAhmwEBAOcBACGcAQgAiAIAIZ0BIADqAQAhngEAAJoCACCfAQEA5wEAIaABAQDnAQAhB3gBAAAAAYABQAAAAAGBAUAAAAABlAEAAACUAQKVAQEAAAABlgFAAAAAAZgBAQAAAAECAwYCCgAJBAkSBAoACAsAAwwAAQMDBwIJCwQKAAcEBAADBQACBw0FCA8GAQYABAEGAAQCAxAACREAAQkTAAEDFAAAAAADCgAOHwAPIAAQAAAAAwoADh8ADyAAEAEGAAQBBgAEBQoAFR8AGCAAGTEAFjIAFwAAAAAABQoAFR8AGCAAGTEAFjIAFwILAAMMAAECCwADDAABBQoAHh8AISAAIjEAHzIAIAAAAAAABQoAHh8AISAAIjEAHzIAIAIEAAMFAAICBAADBQACAwoAJx8AKCAAKQAAAAMKACcfACggACkBBgAEAQYABAUKAC4fADEgADIxAC8yADAAAAAAAAUKAC4fADEgADIxAC8yADAAAAMKADcfADggADkAAAADCgA3HwA4IAA5DQIBDhUBDxgBEBkBERoBExwBFB4KFR8LFiEBFyMKGCQMGyUBHCYBHScKISoNIisRIy0FJC4FJTAFJjEFJzIFKDQFKTYKKjcSKzkFLDsKLTwTLj0FLz4FMD8KM0IUNEMaNUQCNkUCN0YCOEcCOUgCOkoCO0wKPE0bPU8CPlEKP1IcQFMCQVQCQlUKQ1gdRFkjRVoERlsER1wESF0ESV4ESmAES2IKTGMkTWUETmcKT2glUGkEUWoEUmsKU24mVG8qVXEGVnIGV3QGWHUGWXYGWngGW3oKXHsrXX0GXn8KX4ABLGCBAQZhggEGYoMBCmOGAS1khwEzZYkBA2aKAQNnjQEDaI4BA2mPAQNqkQEDa5MBCmyUATRtlgEDbpgBCm-ZATVwmgEDcZsBA3KcAQpznwE2dKABOg"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("node:buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  PropertyScalarFieldEnum: () => PropertyScalarFieldEnum,
  QueryMode: () => QueryMode,
  RentalRequestScalarFieldEnum: () => RentalRequestScalarFieldEnum,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.9.1",
  engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Category: "Category",
  Payment: "Payment",
  Property: "Property",
  RentalRequest: "RentalRequest",
  Review: "Review",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  transactionId: "transactionId",
  amount: "amount",
  method: "method",
  provider: "provider",
  status: "status",
  paidAt: "paidAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  rentalRequestId: "rentalRequestId"
};
var PropertyScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  address: "address",
  price: "price",
  isAvailable: "isAvailable",
  images: "images",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  landlordId: "landlordId",
  categoryId: "categoryId"
};
var RentalRequestScalarFieldEnum = {
  id: "id",
  status: "status",
  message: "message",
  moveInDate: "moveInDate",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  tenantId: "tenantId",
  propertyId: "propertyId"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  rentalRequestId: "rentalRequestId"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  role: "role",
  isBanned: "isBanned",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/errors/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
};
var AppError_default = AppError;

// src/middlewares/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorDetails = err instanceof Error ? err.message : err;
  if (err instanceof AppError_default) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation error";
    errorDetails = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = StatusCodes.CONFLICT;
      message = `Duplicate value for field: ${err.meta?.target}`;
    } else if (err.code === "P2025") {
      statusCode = StatusCodes.NOT_FOUND;
      message = "Resource not found";
    } else {
      statusCode = StatusCodes.BAD_REQUEST;
      message = err.message;
    }
    errorDetails = err.meta ?? err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/middlewares/notFound.ts
import { StatusCodes as StatusCodes2 } from "http-status-codes";
var notFound = (req, res) => {
  res.status(StatusCodes2.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    errorDetails: `No route found for ${req.method} ${req.originalUrl}`
  });
};
var notFound_default = notFound;

// src/routes/index.ts
import { Router as Router5 } from "express";

// src/modules/auth/auth.route.ts
import { Router } from "express";

// src/middlewares/auth.ts
import { StatusCodes as StatusCodes3 } from "http-status-codes";

// src/config/index.ts
import "dotenv/config";
var requiredEnvVars = ["DATABASE_URL", "JWT_ACCESS_SECRET"];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
var config2 = {
  port: process.env.PORT || 3e3,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "7d"
};
var config_default = config2;

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
var catchAsync_default = catchAsync;

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};
var verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
var JwtHelpers = {
  createToken,
  verifyToken
};

// src/middlewares/auth.ts
var auth = (...allowedRoles) => {
  return catchAsync_default(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new AppError_default(StatusCodes3.UNAUTHORIZED, "You are not authorized to access this resource");
    }
    let decoded;
    try {
      decoded = JwtHelpers.verifyToken(token, config_default.jwtAccessSecret);
    } catch {
      throw new AppError_default(StatusCodes3.UNAUTHORIZED, "Invalid or expired token");
    }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      throw new AppError_default(StatusCodes3.UNAUTHORIZED, "User no longer exists");
    }
    if (user.isBanned) {
      throw new AppError_default(StatusCodes3.FORBIDDEN, "This account has been banned");
    }
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      throw new AppError_default(StatusCodes3.FORBIDDEN, "You do not have permission to perform this action");
    }
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    next();
  });
};
var auth_default = auth;

// src/middlewares/validateRequest.ts
var validateRequest = (schema) => {
  return catchAsync_default(async (req, res, next) => {
    const parsed = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query
    });
    req.body = parsed.body ?? req.body;
    next();
  });
};
var validateRequest_default = validateRequest;

// src/modules/auth/auth.controller.ts
import { StatusCodes as StatusCodes5 } from "http-status-codes";

// src/utils/sendResponse.ts
var sendResponse = (res, response) => {
  res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data
  });
};
var sendResponse_default = sendResponse;

// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { StatusCodes as StatusCodes4 } from "http-status-codes";
var registerUser = async (payload) => {
  if (payload.role === "ADMIN") {
    throw new AppError_default(StatusCodes4.BAD_REQUEST, "Cannot register with admin role");
  }
  const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existingUser) {
    throw new AppError_default(StatusCodes4.CONFLICT, "A user with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone ?? null,
      role: payload.role ?? "TENANT"
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isBanned: true,
      createdAt: true
    }
  });
  return user;
};
var loginUser = async (payload) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) {
    throw new AppError_default(StatusCodes4.UNAUTHORIZED, "Invalid email or password");
  }
  if (user.isBanned) {
    throw new AppError_default(StatusCodes4.FORBIDDEN, "This account has been banned");
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new AppError_default(StatusCodes4.UNAUTHORIZED, "Invalid email or password");
  }
  const accessToken = JwtHelpers.createToken(
    { userId: user.id, email: user.email, role: user.role },
    config_default.jwtAccessSecret,
    config_default.jwtAccessExpiresIn
  );
  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isBanned: user.isBanned
    }
  };
};
var getMe = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isBanned: true,
      createdAt: true
    }
  });
  return user;
};
var AuthServices = {
  registerUser,
  loginUser,
  getMe
};

// src/modules/auth/auth.controller.ts
var registerUser2 = catchAsync_default(async (req, res) => {
  const user = await AuthServices.registerUser(req.body);
  sendResponse_default(res, {
    statusCode: StatusCodes5.CREATED,
    success: true,
    message: "User registered successfully",
    data: user
  });
});
var loginUser2 = catchAsync_default(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config_default.nodeEnv === "production",
    sameSite: "lax"
  });
  sendResponse_default(res, {
    statusCode: StatusCodes5.OK,
    success: true,
    message: "Logged in successfully",
    data: { user: result.user }
  });
});
var logoutUser = catchAsync_default(async (req, res) => {
  res.clearCookie("accessToken");
  sendResponse_default(res, {
    statusCode: StatusCodes5.OK,
    success: true,
    message: "Logged out successfully"
  });
});
var getMe2 = catchAsync_default(async (req, res) => {
  const user = await AuthServices.getMe(req.user.userId);
  sendResponse_default(res, {
    statusCode: StatusCodes5.OK,
    success: true,
    message: "User retrieved successfully",
    data: user
  });
});
var AuthControllers = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  logoutUser,
  getMe: getMe2
};

// src/modules/auth/auth.validation.ts
import { z } from "zod";
var registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    role: z.enum(["TENANT", "LANDLORD"]).optional()
  })
});
var loginValidationSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required")
  })
});
var AuthValidations = {
  registerValidationSchema,
  loginValidationSchema
};

// src/modules/auth/auth.route.ts
var router = Router();
router.post(
  "/register",
  validateRequest_default(AuthValidations.registerValidationSchema),
  AuthControllers.registerUser
);
router.post("/login", validateRequest_default(AuthValidations.loginValidationSchema), AuthControllers.loginUser);
router.post("/logout", AuthControllers.logoutUser);
router.get("/me", auth_default(), AuthControllers.getMe);
var AuthRoutes = router;

// src/modules/category/category.route.ts
import { Router as Router2 } from "express";

// src/modules/category/category.controller.ts
import { StatusCodes as StatusCodes6 } from "http-status-codes";

// src/modules/category/category.service.ts
var createCategory = async (payload) => {
  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description ?? null
    }
  });
  return category;
};
var getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
};
var getSingleCategory = async (id) => {
  return prisma.category.findUniqueOrThrow({ where: { id } });
};
var updateCategory = async (id, payload) => {
  return prisma.category.update({
    where: { id },
    data: payload
  });
};
var deleteCategory = async (id) => {
  return prisma.category.delete({ where: { id } });
};
var CategoryServices = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = catchAsync_default(async (req, res) => {
  const category = await CategoryServices.createCategory(req.body);
  sendResponse_default(res, {
    statusCode: StatusCodes6.CREATED,
    success: true,
    message: "Category created successfully",
    data: category
  });
});
var getAllCategories2 = catchAsync_default(async (req, res) => {
  const categories = await CategoryServices.getAllCategories();
  sendResponse_default(res, {
    statusCode: StatusCodes6.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: categories
  });
});
var getSingleCategory2 = catchAsync_default(async (req, res) => {
  const category = await CategoryServices.getSingleCategory(req.params.id);
  sendResponse_default(res, {
    statusCode: StatusCodes6.OK,
    success: true,
    message: "Category retrieved successfully",
    data: category
  });
});
var updateCategory2 = catchAsync_default(async (req, res) => {
  const category = await CategoryServices.updateCategory(req.params.id, req.body);
  sendResponse_default(res, {
    statusCode: StatusCodes6.OK,
    success: true,
    message: "Category updated successfully",
    data: category
  });
});
var deleteCategory2 = catchAsync_default(async (req, res) => {
  await CategoryServices.deleteCategory(req.params.id);
  sendResponse_default(res, {
    statusCode: StatusCodes6.OK,
    success: true,
    message: "Category deleted successfully"
  });
});
var CategoryControllers = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.validation.ts
import { z as z2 } from "zod";
var createCategoryValidationSchema = z2.object({
  body: z2.object({
    name: z2.string().min(1, "Category name is required"),
    description: z2.string().optional()
  })
});
var updateCategoryValidationSchema = z2.object({
  body: z2.object({
    name: z2.string().min(1, "Category name is required").optional(),
    description: z2.string().optional()
  })
});
var CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema
};

// src/modules/category/category.route.ts
var router2 = Router2();
router2.get("/", CategoryControllers.getAllCategories);
router2.get("/:id", CategoryControllers.getSingleCategory);
router2.post(
  "/",
  auth_default("ADMIN"),
  validateRequest_default(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory
);
router2.patch(
  "/:id",
  auth_default("ADMIN"),
  validateRequest_default(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory
);
router2.delete("/:id", auth_default("ADMIN"), CategoryControllers.deleteCategory);
var CategoryRoutes = router2;

// src/modules/property/property.route.ts
import { Router as Router3 } from "express";

// src/modules/property/property.controller.ts
import { StatusCodes as StatusCodes8 } from "http-status-codes";

// src/modules/property/property.service.ts
import { StatusCodes as StatusCodes7 } from "http-status-codes";
var ensureOwnership = async (propertyId, landlordId) => {
  const property = await prisma.property.findUniqueOrThrow({ where: { id: propertyId } });
  if (property.landlordId !== landlordId) {
    throw new AppError_default(StatusCodes7.FORBIDDEN, "You can only manage your own properties");
  }
  return property;
};
var createProperty = async (landlordId, payload) => {
  const property = await prisma.property.create({
    data: {
      title: payload.title,
      description: payload.description,
      address: payload.address,
      price: payload.price,
      categoryId: payload.categoryId,
      images: payload.images ?? [],
      isAvailable: payload.isAvailable ?? true,
      landlordId
    }
  });
  return property;
};
var updateProperty = async (propertyId, landlordId, payload) => {
  await ensureOwnership(propertyId, landlordId);
  return prisma.property.update({
    where: { id: propertyId },
    data: payload
  });
};
var deleteProperty = async (propertyId, landlordId) => {
  await ensureOwnership(propertyId, landlordId);
  return prisma.property.delete({ where: { id: propertyId } });
};
var getAllProperties = async (filters) => {
  const { categoryId, minPrice, maxPrice, isAvailable, search, page = 1, limit = 10 } = filters;
  const where = {
    ...categoryId && { categoryId },
    isAvailable: isAvailable ?? true,
    ...(minPrice !== void 0 || maxPrice !== void 0) && {
      price: {
        ...minPrice !== void 0 && { gte: minPrice },
        ...maxPrice !== void 0 && { lte: maxPrice }
      }
    },
    ...search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } }
      ]
    }
  };
  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        category: true,
        landlord: { select: { id: true, name: true, email: true, phone: true } }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.property.count({ where })
  ]);
  return {
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    properties
  };
};
var getSingleProperty = async (id) => {
  return prisma.property.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      landlord: { select: { id: true, name: true, email: true, phone: true } }
    }
  });
};
var PropertyServices = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty
};

// src/modules/property/property.controller.ts
var createProperty2 = catchAsync_default(async (req, res) => {
  const property = await PropertyServices.createProperty(req.user.userId, req.body);
  sendResponse_default(res, {
    statusCode: StatusCodes8.CREATED,
    success: true,
    message: "Property created successfully",
    data: property
  });
});
var updateProperty2 = catchAsync_default(async (req, res) => {
  const property = await PropertyServices.updateProperty(
    req.params.id,
    req.user.userId,
    req.body
  );
  sendResponse_default(res, {
    statusCode: StatusCodes8.OK,
    success: true,
    message: "Property updated successfully",
    data: property
  });
});
var deleteProperty2 = catchAsync_default(async (req, res) => {
  await PropertyServices.deleteProperty(req.params.id, req.user.userId);
  sendResponse_default(res, {
    statusCode: StatusCodes8.OK,
    success: true,
    message: "Property deleted successfully"
  });
});
var getAllProperties2 = catchAsync_default(async (req, res) => {
  const { categoryId, minPrice, maxPrice, isAvailable, search, page, limit } = req.query;
  const result = await PropertyServices.getAllProperties({
    categoryId,
    minPrice: minPrice ? Number(minPrice) : void 0,
    maxPrice: maxPrice ? Number(maxPrice) : void 0,
    isAvailable: isAvailable !== void 0 ? isAvailable === "true" : void 0,
    search,
    page: page ? Number(page) : void 0,
    limit: limit ? Number(limit) : void 0
  });
  sendResponse_default(res, {
    statusCode: StatusCodes8.OK,
    success: true,
    message: "Properties retrieved successfully",
    data: result
  });
});
var getSingleProperty2 = catchAsync_default(async (req, res) => {
  const property = await PropertyServices.getSingleProperty(req.params.id);
  sendResponse_default(res, {
    statusCode: StatusCodes8.OK,
    success: true,
    message: "Property retrieved successfully",
    data: property
  });
});
var PropertyControllers = {
  createProperty: createProperty2,
  updateProperty: updateProperty2,
  deleteProperty: deleteProperty2,
  getAllProperties: getAllProperties2,
  getSingleProperty: getSingleProperty2
};

// src/modules/property/property.validation.ts
import { z as z3 } from "zod";
var createPropertyValidationSchema = z3.object({
  body: z3.object({
    title: z3.string().min(1, "Title is required"),
    description: z3.string().min(1, "Description is required"),
    address: z3.string().min(1, "Address is required"),
    price: z3.number().positive("Price must be a positive number"),
    categoryId: z3.uuid("Invalid category id"),
    images: z3.array(z3.string()).optional(),
    isAvailable: z3.boolean().optional()
  })
});
var updatePropertyValidationSchema = z3.object({
  body: z3.object({
    title: z3.string().min(1, "Title is required").optional(),
    description: z3.string().min(1, "Description is required").optional(),
    address: z3.string().min(1, "Address is required").optional(),
    price: z3.number().positive("Price must be a positive number").optional(),
    categoryId: z3.uuid("Invalid category id").optional(),
    images: z3.array(z3.string()).optional(),
    isAvailable: z3.boolean().optional()
  })
});
var PropertyValidations = {
  createPropertyValidationSchema,
  updatePropertyValidationSchema
};

// src/modules/property/property.route.ts
var router3 = Router3();
router3.get("/", PropertyControllers.getAllProperties);
router3.get("/:id", PropertyControllers.getSingleProperty);
router3.post(
  "/",
  auth_default("LANDLORD"),
  validateRequest_default(PropertyValidations.createPropertyValidationSchema),
  PropertyControllers.createProperty
);
router3.patch(
  "/:id",
  auth_default("LANDLORD"),
  validateRequest_default(PropertyValidations.updatePropertyValidationSchema),
  PropertyControllers.updateProperty
);
router3.delete("/:id", auth_default("LANDLORD"), PropertyControllers.deleteProperty);
var PropertyRoutes = router3;

// src/modules/rental-request/rental-request.route.ts
import { Router as Router4 } from "express";

// src/modules/rental-request/rental-request.controller.ts
import { StatusCodes as StatusCodes10 } from "http-status-codes";

// src/modules/rental-request/rental-request.service.ts
import { StatusCodes as StatusCodes9 } from "http-status-codes";
var createRentalRequest = async (tenantId, payload) => {
  const property = await prisma.property.findUniqueOrThrow({ where: { id: payload.propertyId } });
  if (!property.isAvailable) {
    throw new AppError_default(StatusCodes9.BAD_REQUEST, "This property is not currently available for rent");
  }
  if (property.landlordId === tenantId) {
    throw new AppError_default(StatusCodes9.BAD_REQUEST, "You cannot submit a rental request for your own property");
  }
  const existingPendingRequest = await prisma.rentalRequest.findFirst({
    where: {
      propertyId: payload.propertyId,
      tenantId,
      status: "PENDING"
    }
  });
  if (existingPendingRequest) {
    throw new AppError_default(StatusCodes9.CONFLICT, "You already have a pending request for this property");
  }
  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      moveInDate: new Date(payload.moveInDate),
      message: payload.message ?? null
    }
  });
  return rentalRequest;
};
var updateRentalRequestStatus = async (rentalRequestId, landlordId, status) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id: rentalRequestId },
    include: { property: true }
  });
  if (rentalRequest.property.landlordId !== landlordId) {
    throw new AppError_default(StatusCodes9.FORBIDDEN, "You can only manage requests for your own properties");
  }
  if (rentalRequest.status !== "PENDING") {
    throw new AppError_default(
      StatusCodes9.BAD_REQUEST,
      `This rental request has already been ${rentalRequest.status.toLowerCase()} and cannot be updated`
    );
  }
  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.rentalRequest.update({
      where: { id: rentalRequestId },
      data: { status }
    });
    if (status === "APPROVED") {
      await tx.property.update({
        where: { id: rentalRequest.propertyId },
        data: { isAvailable: false }
      });
    }
    return result;
  });
  return updated;
};
var getMyRentalRequests = async (tenantId) => {
  return prisma.rentalRequest.findMany({
    where: { tenantId },
    include: { property: { include: { category: true } } },
    orderBy: { createdAt: "desc" }
  });
};
var getLandlordRentalRequests = async (landlordId) => {
  return prisma.rentalRequest.findMany({
    where: { property: { landlordId } },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true, phone: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getSingleRentalRequest = async (id, userId, role) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: { id },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true, phone: true } }
    }
  });
  const isTenant = rentalRequest.tenantId === userId;
  const isLandlord = rentalRequest.property.landlordId === userId;
  const isAdmin = role === "ADMIN";
  if (!isTenant && !isLandlord && !isAdmin) {
    throw new AppError_default(StatusCodes9.FORBIDDEN, "You do not have permission to view this rental request");
  }
  return rentalRequest;
};
var RentalRequestServices = {
  createRentalRequest,
  updateRentalRequestStatus,
  getMyRentalRequests,
  getLandlordRentalRequests,
  getSingleRentalRequest
};

// src/modules/rental-request/rental-request.controller.ts
var createRentalRequest2 = catchAsync_default(async (req, res) => {
  const rentalRequest = await RentalRequestServices.createRentalRequest(req.user.userId, req.body);
  sendResponse_default(res, {
    statusCode: StatusCodes10.CREATED,
    success: true,
    message: "Rental request submitted successfully",
    data: rentalRequest
  });
});
var updateRentalRequestStatus2 = catchAsync_default(async (req, res) => {
  const rentalRequest = await RentalRequestServices.updateRentalRequestStatus(
    req.params.id,
    req.user.userId,
    req.body.status
  );
  sendResponse_default(res, {
    statusCode: StatusCodes10.OK,
    success: true,
    message: `Rental request ${rentalRequest.status.toLowerCase()} successfully`,
    data: rentalRequest
  });
});
var getMyRentalRequests2 = catchAsync_default(async (req, res) => {
  const rentalRequests = await RentalRequestServices.getMyRentalRequests(req.user.userId);
  sendResponse_default(res, {
    statusCode: StatusCodes10.OK,
    success: true,
    message: "Rental requests retrieved successfully",
    data: rentalRequests
  });
});
var getLandlordRentalRequests2 = catchAsync_default(async (req, res) => {
  const rentalRequests = await RentalRequestServices.getLandlordRentalRequests(req.user.userId);
  sendResponse_default(res, {
    statusCode: StatusCodes10.OK,
    success: true,
    message: "Rental requests retrieved successfully",
    data: rentalRequests
  });
});
var getSingleRentalRequest2 = catchAsync_default(async (req, res) => {
  const rentalRequest = await RentalRequestServices.getSingleRentalRequest(
    req.params.id,
    req.user.userId,
    req.user.role
  );
  sendResponse_default(res, {
    statusCode: StatusCodes10.OK,
    success: true,
    message: "Rental request retrieved successfully",
    data: rentalRequest
  });
});
var RentalRequestControllers = {
  createRentalRequest: createRentalRequest2,
  updateRentalRequestStatus: updateRentalRequestStatus2,
  getMyRentalRequests: getMyRentalRequests2,
  getLandlordRentalRequests: getLandlordRentalRequests2,
  getSingleRentalRequest: getSingleRentalRequest2
};

// src/modules/rental-request/rental-request.validation.ts
import { z as z4 } from "zod";
var createRentalRequestValidationSchema = z4.object({
  body: z4.object({
    propertyId: z4.uuid("Invalid property id"),
    moveInDate: z4.string().refine((val) => !Number.isNaN(Date.parse(val)), "Invalid move-in date").refine((val) => new Date(val).getTime() > Date.now(), "Move-in date must be in the future"),
    message: z4.string().optional()
  })
});
var updateRentalRequestStatusValidationSchema = z4.object({
  body: z4.object({
    status: z4.enum(["APPROVED", "REJECTED"])
  })
});
var RentalRequestValidations = {
  createRentalRequestValidationSchema,
  updateRentalRequestStatusValidationSchema
};

// src/modules/rental-request/rental-request.route.ts
var router4 = Router4();
router4.get("/my-requests", auth_default("TENANT"), RentalRequestControllers.getMyRentalRequests);
router4.get("/landlord-requests", auth_default("LANDLORD"), RentalRequestControllers.getLandlordRentalRequests);
router4.get("/:id", auth_default(), RentalRequestControllers.getSingleRentalRequest);
router4.post(
  "/",
  auth_default("TENANT"),
  validateRequest_default(RentalRequestValidations.createRentalRequestValidationSchema),
  RentalRequestControllers.createRentalRequest
);
router4.patch(
  "/:id/status",
  auth_default("LANDLORD"),
  validateRequest_default(RentalRequestValidations.updateRentalRequestStatusValidationSchema),
  RentalRequestControllers.updateRentalRequestStatus
);
var RentalRequestRoutes = router4;

// src/routes/index.ts
var router5 = Router5();
var moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/categories",
    route: CategoryRoutes
  },
  {
    path: "/properties",
    route: PropertyRoutes
  },
  {
    path: "/rental-requests",
    route: RentalRequestRoutes
  }
];
moduleRoutes.forEach((route) => router5.use(route.path, route.route));
var routes_default = router5;

// src/app.ts
var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", routes_default);
app.use(notFound_default);
app.use(globalErrorHandler_default);
var app_default = app;
export {
  app_default as default
};
