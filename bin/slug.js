#!/usr/bin/env node

import slug from '../slug.js';

process.stdout.write(slug(process.argv[2], '_'));
