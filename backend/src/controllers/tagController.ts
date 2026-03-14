import type {Response} from 'express';
import type {AuthenticatedRequest} from '../middleware/auth.ts';
import {db} from '../db/connection.ts';
import {habits, entries, habitTags, tags, type Habit} from '../db/schema.ts';
import {eq, and, desc, inArray} from 'drizzle-orm';


//region GET
//endregion


//region POST
//endregion


//region PATCH/PUT/DELETE
//endregion