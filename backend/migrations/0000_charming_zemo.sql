CREATE TYPE "public"."data_type" AS ENUM('string', 'int', 'float', 'decimal', 'bool');--> statement-breakpoint
CREATE TYPE "public"."listing_condition" AS ENUM('new', 'refurbished', 'used', 'modded_new', 'modded_used');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('ordered', 'in_transit', 'delivered');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"business_id" uuid,
	"email" varchar(254) NOT NULL,
	"phone" varchar(15),
	"password_hash" text NOT NULL,
	"street_address" varchar(128) NOT NULL,
	"street_number" varchar(16) NOT NULL,
	"apartment_suite" varchar(32),
	"city" varchar(128) NOT NULL,
	"postal_code" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null,
	CONSTRAINT "accounts_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "accounts_business_id_unique" UNIQUE("business_id"),
	CONSTRAINT "accounts_email_unique" UNIQUE("email"),
	CONSTRAINT "account_unique_owner_check" CHECK (
    ("accounts"."user_id" IS NOT NULL AND "accounts"."business_id" IS NULL) OR 
    ("accounts"."user_id" IS NULL AND "accounts"."business_id" IS NOT NULL)
    )
);
--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" varchar(128) NOT NULL,
	"data_type" "data_type" NOT NULL,
	"is_selectable" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_required" boolean DEFAULT false NOT NULL,
	"prefix" varchar(16) DEFAULT null,
	"suffix" varchar(16) DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" text,
	"vat_number" varchar(32) NOT NULL,
	CONSTRAINT "businesses_name_unique" UNIQUE("name"),
	CONSTRAINT "businesses_vat_number_unique" UNIQUE("vat_number")
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"user_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"quantity" smallint NOT NULL,
	CONSTRAINT "cart_items_user_id_listing_id_pk" PRIMARY KEY("user_id","listing_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"parent_id" uuid
);
--> statement-breakpoint
CREATE TABLE "listing_attribute_values" (
	"listing_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL,
	"value_string" varchar(256),
	"value_int" integer,
	"value_float" real,
	"value_decimal" numeric(34, 2),
	"value_bool" boolean,
	CONSTRAINT "listing_attribute_values_listing_id_attribute_id_pk" PRIMARY KEY("listing_id","attribute_id"),
	CONSTRAINT "listing_attribute_value_check" CHECK (
    ("listing_attribute_values"."value_string" IS NOT NULL)::int +
    ("listing_attribute_values"."value_int" IS NOT NULL)::int +
    ("listing_attribute_values"."value_float" IS NOT NULL)::int +
    ("listing_attribute_values"."value_decimal" IS NOT NULL)::int +
    ("listing_attribute_values"."value_bool" IS NOT NULL)::int <= 1
    )
);
--> statement-breakpoint
CREATE TABLE "listing_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"order_nr" smallint NOT NULL,
	"alt_text" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selling_account_id" uuid NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" text,
	"main_category_id" uuid NOT NULL,
	"price" numeric(8, 2) NOT NULL,
	"stockQuantity" smallint NOT NULL,
	"condition" "listing_condition" NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL,
	"is_listed" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "order_listings" (
	"order_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"quantity" smallint NOT NULL,
	"price_snapshot" numeric(11, 2) NOT NULL,
	CONSTRAINT "order_listings_order_id_listing_id_pk" PRIMARY KEY("order_id","listing_id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_price" numeric(11, 2) NOT NULL,
	"status" "order_status" DEFAULT 'ordered' NOT NULL,
	"orderedAt" timestamp DEFAULT now() NOT NULL,
	"shippedAt" timestamp DEFAULT null,
	"deliveredAt" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(32) NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_attribute_values" ADD CONSTRAINT "listing_attribute_values_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_attribute_values" ADD CONSTRAINT "listing_attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_selling_account_id_accounts_id_fk" FOREIGN KEY ("selling_account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_main_category_id_categories_id_fk" FOREIGN KEY ("main_category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_listings" ADD CONSTRAINT "order_listings_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_listings" ADD CONSTRAINT "order_listings_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;