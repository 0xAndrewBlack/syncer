-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id character varying(128) COLLATE pg_catalog."default" NOT NULL,
    user_name character varying(64) COLLATE pg_catalog."default",
    discord_handle character varying(64) COLLATE pg_catalog."default",
    github_handle character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to syncer;