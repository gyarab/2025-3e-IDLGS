ALTER TABLE "exercise" DROP CONSTRAINT "colorValues";--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "colorValues" CHECK (("backgroundColorR" >= 0 AND "backgroundColorR" <= 255) AND
			("backgroundColorG" >= 0 AND "backgroundColorG" <= 255) AND
			("backgroundColorB" >= 0 AND "backgroundColorB" <= 255) AND
			("foregroundColorR" >= 0 AND "foregroundColorR" <= 255) AND
			("foregroundColorG" >= 0 AND "foregroundColorG" <= 255) AND
			("foregroundColorB" >= 0 AND "foregroundColorB" <= 255));