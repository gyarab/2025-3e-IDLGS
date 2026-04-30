ALTER TABLE "exercise" DROP CONSTRAINT "exerciseTypeData";--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exerciseTypeData" CHECK ((type = 'CRS' AND crs IS NOT NULL AND "crosswordDataId" IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'CRW' AND crw IS NOT NULL AND "crosswordDataId" IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'DEF' AND def IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GRP' AND grp IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GEO' AND geo IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND ext IS NULL) OR
			(type = 'EXT' AND ext IS NOT NULL AND "crosswordDataId" IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL) OR
			(type = 'CRW' AND "crosswordDataId" IS NOT NULL AND crs IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL)
			);