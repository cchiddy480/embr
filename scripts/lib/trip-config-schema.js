/*
  Plain-JS mirror of packages/hub-app/src/types/blocks-schema.ts's
  TripConfigSchema, for use by CLI scripts that run outside the hub-app
  TypeScript build (validate-client-config.js, configs-push.js,
  prospect-demo.js). Node scripts here are plain CommonJS with no
  TS-to-JS build step, so this can't just `require` the .ts file directly.

  Keep this in sync with blocks-schema.ts by hand whenever a field changes
  there — there are only a handful of fields, so this is a deliberate,
  small duplication rather than adding a build step to scripts/.
*/

const { z } = require('zod');

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'must be a 6-digit hex color, e.g. #0F766E');

const ThemeSchema = z.object({
  colors: z.object({
    primary: hexColor,
    secondary: hexColor,
    background: hexColor,
    surface: hexColor,
    text: hexColor,
    textSecondary: hexColor,
    border: hexColor.optional(),
  }),
  fonts: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
  }),
});

const ScheduleEventSchema = z.object({
  id: z.string().min(1),
  day: z.string().min(1),
  time: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  mapUrl: z.string().url().optional(),
  timeApprox: z.boolean().optional(),
  timezoneNote: z.string().optional(),
});

const ScheduleBlockSchema = z.object({
  type: z.literal('schedule'),
  id: z.string().min(1),
  title: z.string().min(1),
  events: z.array(ScheduleEventSchema),
});

const VenueSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

const InfoBlockSchema = z.object({
  type: z.literal('info'),
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  venue: VenueSchema.optional(),
});

const ContactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional(),
});

const ContactsBlockSchema = z.object({
  type: z.literal('contacts'),
  id: z.string().min(1),
  title: z.string().min(1),
  contacts: z.array(ContactSchema),
});

const UpdatesBlockSchema = z.object({
  type: z.literal('updates'),
  id: z.string().min(1),
  title: z.string().min(1),
});

const BlockSchema = z.discriminatedUnion('type', [
  ScheduleBlockSchema,
  InfoBlockSchema,
  ContactsBlockSchema,
  UpdatesBlockSchema,
]);

const TripConfigSchema = z.object({
  clientId: z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, numbers and hyphens only'),
  name: z.string().min(1).max(50),
  expiry: z.string().datetime({ message: 'must be an ISO 8601 datetime, e.g. 2026-10-01T00:00:00Z' }),
  status: z.enum(['preview', 'active', 'expired']).default('preview'),
  theme: ThemeSchema,
  blocks: z.array(BlockSchema).min(1, 'a guide needs at least one block'),
  watermark: z.boolean().optional(),
});

function isTripConfigShape(value) {
  return typeof value === 'object' && value !== null && Array.isArray(value.blocks);
}

module.exports = { TripConfigSchema, BlockSchema, isTripConfigShape };
