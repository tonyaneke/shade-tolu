# Words from Friends Feature

## Overview

A beautiful, animated section that displays goodwill messages from wedding guests who submitted RSVPs. Messages are fetched from the database and displayed in elegant outline cards with smooth animations.

## Files Created

### 1. `/app/api/messages/route.ts`

API endpoint that fetches RSVP goodwill messages from the database.

**Endpoint:** `GET /api/messages`

**Response:**

```json
{
  "success": true,
  "messages": [
    {
      "name": "John Doe",
      "message": "Congratulations to the happy couple!",
      "date": "2024-10-21T12:00:00.000Z"
    }
  ]
}
```

**Features:**

- ✅ Fetches only RSVPs with goodwill messages (non-empty)
- ✅ Orders by most recent first
- ✅ Returns formatted data (name, message, date)
- ✅ Error handling

### 2. `/src/ui/WordsFromFriends.tsx`

Main component that displays the goodwill messages in animated cards.

**Features:**

- ✅ Fetches messages from API on component mount
- ✅ Beautiful gradient backgrounds
- ✅ Animated outline cards with hover effects
- ✅ Initial badges with first letter of name
- ✅ Formatted dates
- ✅ Quote icons and decorative elements
- ✅ Loading state with skeleton UI
- ✅ Auto-hides if no messages exist
- ✅ Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- ✅ Smooth scroll reveal animations

### 3. `/app/(main)/words/page.tsx`

Standalone page for viewing all messages.

**Access:** `http://localhost:3000/words`

## Integration

The `WordsFromFriends` component is integrated into the home page (`app/page.tsx`) and displays:

- After the Testimonials section
- Before the Attending CTA
- Lazy loaded for performance

## Design Features

### Card Design

- **Small, minimalist outline cards** with 2px border
- **Gradient top accent** (amber → yellow → pink)
- **Floating quote icon** in top-left corner
- **Initial badge** with gradient background
- **Hover effects:**
  - Lifts up (-8px)
  - Slight scale (1.02x)
  - Enhanced shadow
  - Glow effect underneath
  - Quote icon scales

### Animations

- **Scroll reveal** - Cards fade in and slide up as they enter viewport
- **Staggered entrance** - Each card delays by 0.1s for cascading effect
- **Hover animations** - Smooth transforms on card hover
- **Heart icon pulse** - Subtle pulse on the heart icon

### Color Scheme

Follows your aesthetic preferences:

- **Gradients:** Amber, yellow, pink, purple
- **Clean backgrounds:** White with subtle gradient overlays
- **Soft shadows:** Elegant elevation without harsh shadows

## Data Flow

```
RSVP Form Submission
    ↓
Saves to PostgreSQL (with goodwill_message)
    ↓
/api/messages fetches messages
    ↓
WordsFromFriends component displays
    ↓
Beautiful animated cards on screen
```

## Card Layout

Each card displays:

1. **Top:** Gradient accent bar (1px)
2. **Quote Icon:** Floating gradient badge (top-left)
3. **Message:** Italicized quote with min-height
4. **Divider:** Gradient horizontal line
5. **Bottom Section:**
   - Initial badge (circular, gradient)
   - Guest name (bold)
   - Date (formatted)
   - Heart icon (filled, pink)

## Responsive Design

- **Mobile (< 768px):** 1 column
- **Tablet (768px - 1024px):** 2 columns
- **Desktop (> 1024px):** 3 columns
- **Gap:** 24px between cards
- **Padding:** Responsive section padding

## States

### Loading State

- Shows animated skeleton with pulsing placeholders
- Maintains section layout during load

### Empty State

- Component returns `null` if no messages
- Section doesn't appear if no data

### Populated State

- Grid of animated cards
- Footer message: "Thank you for your beautiful words and blessings! 💕"

## Performance Optimizations

1. **Dynamic Import:** Lazy loaded on home page
2. **SSR Enabled:** Server-side rendering for SEO
3. **Loading Skeleton:** Prevents layout shift
4. **Efficient Queries:** Only fetches non-empty messages
5. **Memoized Animations:** Smooth 60fps animations

## Usage

### Viewing Messages

1. **Home Page:** Scroll down to see the section (if messages exist)
2. **Dedicated Page:** Visit `/words`

### Message Source

Messages come from RSVP submissions where users filled in the "Goodwill Message" field (max 250 characters).

## Customization

### Change Card Style

Edit `/src/ui/WordsFromFriends.tsx`:

- Modify `border-2 border-amber-200/60` for border style
- Adjust `rounded-3xl` for corner radius
- Change gradient colors in gradient definitions

### Modify Grid Layout

```tsx
// Current: 1 col mobile, 2 tablet, 3 desktop
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

// Example: 2 col mobile, 3 tablet, 4 desktop
className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
```

### Update API Sorting

Edit `/app/api/messages/route.ts`:

```sql
-- Current: Most recent first
ORDER BY created_at DESC

-- Change to: Oldest first
ORDER BY created_at ASC

-- Change to: Alphabetical
ORDER BY name ASC
```

## Testing

1. **Submit RSVPs** with goodwill messages via `/rsvp`
2. **Visit home page** - scroll to see "Words from Friends"
3. **Check animations** - cards should fade in and lift on hover
4. **Test responsive** - resize browser to see grid adjust
5. **Verify API** - Check `http://localhost:3000/api/messages`

## Example Message Display

```
┌─────────────────────────────────────┐
│ ● [Quote Icon]                      │
│                                     │
│ "These two are meant to be! Their  │
│  chemistry is undeniable..."        │
│                                     │
│ ─────────────────────────────────  │
│                                     │
│  [J]  James Williams    ♥          │
│       Oct 21, 2024                 │
│                                     │
└─────────────────────────────────────┘
```

## Future Enhancements

- [ ] Add pagination for many messages
- [ ] Add search/filter functionality
- [ ] Add "featured" message highlighting
- [ ] Add social sharing for individual messages
- [ ] Add moderation/approval workflow
- [ ] Add like/react functionality

## Database Schema Reference

Messages are pulled from the `rsvps` table:

```sql
SELECT name, goodwill_message, created_at
FROM rsvps
WHERE goodwill_message IS NOT NULL
AND goodwill_message != ''
ORDER BY created_at DESC
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Alt text for decorative elements
- ✅ Keyboard navigation support
- ✅ Reduced motion support (via Framer Motion)
- ✅ Color contrast compliance
