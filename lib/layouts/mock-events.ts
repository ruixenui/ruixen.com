import type {
  CalendarEvent,
  EventColor,
  EventReminder,
} from "@/components/layouts/calendar/week-view-types";

function d(month: number, day: number, hour: number, minute = 0): Date {
  return new Date(2026, month - 1, day, hour, minute);
}

function dy(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
): Date {
  return new Date(year, month - 1, day, hour, minute);
}

interface EventOpts {
  isAllDay?: boolean;
  description?: string;
  location?: string;
  timezone?: string;
  recurrence?: string;
  reminders?: EventReminder[];
  status?: "busy" | "free";
  visibility?: "default" | "public" | "private";
  calendarEmail?: string;
}

function ev(
  id: string,
  title: string,
  start: Date,
  end: Date,
  color: EventColor,
  calendarId: string,
  opts?: EventOpts,
): CalendarEvent {
  return { id, title, start, end, color, calendarId, ...opts };
}

/**
 * Generates mock events with fixed dates across January–March 2026.
 *
 * Calendar mapping:
 *   you@example.com       → red     (main email)
 *   Work               → blue    (work projects)
 *   Personal           → purple  (personal)
 *   Family             → orange  (family)
 *   Side Projects      → yellow  (side projects)
 *   Fitness            → green   (gym/sports)
 *   Holidays in Brazil → green   (subscribed)
 */
export function generateMockEvents(): CalendarEvent[] {
  return [
    // ── January 2026 ──

    // Week of Jan 4 (Sun Jan 4 – Sat Jan 10)
    ev(
      "j01",
      "New Year Planning",
      d(1, 5, 9),
      d(1, 5, 10, 30),
      "blue",
      "Work",
      {
        description:
          "Align on Q1 goals and key deliverables for the engineering team",
        reminders: [{ amount: 1, unit: "hours" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "j02",
      "Team Standup",
      d(1, 5, 10, 30),
      d(1, 5, 11),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j03",
      "Lunch with Alex",
      d(1, 6, 12),
      d(1, 6, 13),
      "purple",
      "Personal",
      { location: "Ichiran Ramen", calendarEmail: "you@example.com" },
    ),
    ev(
      "j04",
      "Client Onboarding",
      d(1, 7, 14),
      d(1, 7, 15, 30),
      "blue",
      "Work",
      {
        description:
          "Walk through platform setup and API integration with Acme Corp",
        reminders: [
          { amount: 15, unit: "minutes" },
          { amount: 1, unit: "hours" },
        ],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j04b",
      "1:1 with Manager",
      d(1, 7, 15, 30),
      d(1, 7, 16),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "First 1:1 of the year — set annual goals",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("j05", "Gym", d(1, 8, 18), d(1, 8, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j06", "Friday Wrap-up", d(1, 9, 16), d(1, 9, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j06b", "Happy Hour", d(1, 9, 17), d(1, 9, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),

    // Week of Jan 11 (Sun Jan 11 – Sat Jan 17)
    ev(
      "j07",
      "Team Standup",
      d(1, 12, 9),
      d(1, 12, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j08",
      "Product Roadmap Review",
      d(1, 12, 10),
      d(1, 12, 11, 30),
      "blue",
      "Work",
      {
        description:
          "Review H1 roadmap with product and design leads. Bring updated estimates.",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "j09",
      "Design Sync",
      d(1, 13, 11),
      d(1, 13, 12),
      "yellow",
      "Side Projects",
      { calendarEmail: "you@example.com" },
    ),
    ev(
      "j10",
      "1:1 with Manager",
      d(1, 14, 15),
      d(1, 14, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Career growth discussion, Q1 goals check-in",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("j10b", "Gym", d(1, 15, 18), d(1, 15, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j11", "Dentist", d(1, 15, 10), d(1, 15, 11), "purple", "Personal", {
      description: "Regular cleaning + check-up. Bring insurance card.",
      location: "SmileCare Dental",
      reminders: [
        { amount: 1, unit: "hours" },
        { amount: 1, unit: "days" },
      ],
      calendarEmail: "you@example.com",
    }),
    ev(
      "j12",
      "Movie Night",
      d(1, 16, 19),
      d(1, 16, 21, 30),
      "orange",
      "Family",
      {
        description:
          "Watching the new sci-fi movie everyone's been talking about",
        location: "AMC Theater",
        reminders: [{ amount: 30, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("j12b", "Friday Wrap-up", d(1, 16, 16), d(1, 16, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j12c", "Happy Hour", d(1, 16, 17), d(1, 16, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "j13",
      "MLK Day",
      d(1, 19, 0),
      d(1, 19, 0),
      "green",
      "Holidays in Brazil",
      { isAllDay: true, calendarEmail: "you@example.com" },
    ),

    // Week of Jan 18 (Sun Jan 18 – Sat Jan 24)
    ev(
      "j14",
      "Team Standup",
      d(1, 19, 9),
      d(1, 19, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j15",
      "Sprint Planning",
      d(1, 19, 10),
      d(1, 19, 11, 30),
      "blue",
      "Work",
      {
        recurrence: "Every 2 weeks on Mon",
        description: "Scope sprint 3 stories, assign points and owners",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "j16",
      "Coffee Chat",
      d(1, 20, 14),
      d(1, 20, 14, 30),
      "purple",
      "Personal",
      { location: "Blue Bottle Coffee", calendarEmail: "you@example.com" },
    ),
    ev(
      "j17",
      "Architecture Review",
      d(1, 21, 13),
      d(1, 21, 14, 30),
      "blue",
      "Work",
      {
        description:
          "Review proposed microservice migration plan. Discuss trade-offs with team.",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "j17b",
      "1:1 with Manager",
      d(1, 21, 15),
      d(1, 21, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Weekly sync — project assignments and growth plan",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("j18", "Gym", d(1, 22, 18), d(1, 22, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j18b", "Friday Wrap-up", d(1, 23, 16), d(1, 23, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j19", "Happy Hour", d(1, 23, 17), d(1, 23, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      description: "Drinks with the team at the usual spot",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j20", "Brunch", d(1, 24, 11), d(1, 24, 13), "orange", "Family", {
      description: "Monthly family brunch — Mom's picking the place",
      location: "Café Lola",
      reminders: [{ amount: 1, unit: "hours" }],
      calendarEmail: "you@example.com",
    }),

    // Week of Jan 25 (Sun Jan 25 – Sat Jan 31)
    ev(
      "j21",
      "Team Standup",
      d(1, 26, 9),
      d(1, 26, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j22",
      "Quarterly Review Prep",
      d(1, 26, 11),
      d(1, 26, 12, 30),
      "blue",
      "Work",
      {
        description: "Prepare slides and metrics for Q4 review presentation",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "j23",
      "Client Demo",
      d(1, 27, 14),
      d(1, 27, 15),
      "red",
      "you@example.com",
      {
        description: "Demo new dashboard features to Acme Corp stakeholders",
        reminders: [
          { amount: 30, unit: "minutes" },
          { amount: 1, unit: "hours" },
        ],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "j24",
      "Open Source Contrib",
      d(1, 28, 13),
      d(1, 28, 14),
      "yellow",
      "Side Projects",
      { calendarEmail: "you@example.com" },
    ),
    ev(
      "j24b",
      "1:1 with Manager",
      d(1, 28, 15),
      d(1, 28, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Quarterly review prep discussion",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("j25", "Retro", d(1, 29, 14), d(1, 29, 15), "blue", "Work", {
      recurrence: "Every 2 weeks on Thu",
      description: "Sprint 2 retrospective — what went well, what to improve",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j26", "Gym", d(1, 29, 18), d(1, 29, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      description: "Full body circuit training",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j26b", "Friday Wrap-up", d(1, 30, 16), d(1, 30, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("j26c", "Happy Hour", d(1, 30, 17), d(1, 30, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "j27",
      "Month-End Report",
      d(1, 30, 10),
      d(1, 30, 11, 30),
      "red",
      "you@example.com",
      {
        description: "Compile January metrics and submit to finance",
        reminders: [{ amount: 1, unit: "hours" }],
        calendarEmail: "you@example.com",
      },
    ),

    // ── February 2026 ──

    // Week of Feb 1 (Sun Feb 1 – Sat Feb 7)
    ev(
      "f01",
      "Team Standup",
      d(2, 2, 9),
      d(2, 2, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev("f02", "Q1 Kickoff", d(2, 2, 10), d(2, 2, 12), "blue", "Work", {
      description: "Company-wide Q1 kickoff. CEO presenting vision and OKRs.",
      location: "Conference Room A",
      reminders: [
        { amount: 30, unit: "minutes" },
        { amount: 1, unit: "days" },
      ],
      calendarEmail: "you@example.com",
      status: "busy",
      timezone: "GMT-3 Sao Paulo",
    }),
    ev(
      "f03",
      "Lunch with Sarah",
      d(2, 3, 12),
      d(2, 3, 13),
      "purple",
      "Personal",
      {
        description: "She wants to chat about switching jobs — bring advice",
        location: "Sweetgreen",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f03b",
      "1:1 with Manager",
      d(2, 4, 15),
      d(2, 4, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f04",
      "Design Review",
      d(2, 4, 14),
      d(2, 4, 15, 30),
      "yellow",
      "Side Projects",
      {
        description:
          "Review component library updates — new button variants and color tokens",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f05", "Workshop", d(2, 5, 9), d(2, 5, 12), "blue", "Work", {
      description:
        "React Patterns Workshop — advanced hooks, composition, and performance",
      location: "Main Hall",
      reminders: [{ amount: 1, unit: "hours" }],
      calendarEmail: "you@example.com",
      status: "busy",
      visibility: "public",
    }),
    ev("f06", "Gym", d(2, 5, 18), d(2, 5, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f06b", "Friday Wrap-up", d(2, 6, 16), d(2, 6, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f06c", "Happy Hour", d(2, 6, 17), d(2, 6, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "The Brewery",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f07",
      "Family Dinner",
      d(2, 6, 12),
      d(2, 6, 13, 30),
      "orange",
      "Family",
      {
        description: "Dad's birthday celebration dinner",
        location: "Olive Garden",
        reminders: [
          { amount: 1, unit: "hours" },
          { amount: 1, unit: "days" },
        ],
        calendarEmail: "you@example.com",
      },
    ),

    // Week of Feb 8 (Sun Feb 8 – Sat Feb 14)
    ev(
      "f08",
      "Team Standup",
      d(2, 9, 9),
      d(2, 9, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "f09",
      "Project Planning",
      d(2, 9, 10),
      d(2, 9, 11, 30),
      "blue",
      "Work",
      {
        recurrence: "Every 2 weeks on Mon",
        description:
          "Scope new auth service project — timeline, resources, dependencies",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f09b",
      "Budget Review",
      d(2, 9, 10, 30),
      d(2, 9, 11),
      "red",
      "you@example.com",
      {
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f10",
      "Client Call",
      d(2, 10, 14, 30),
      d(2, 10, 15, 30),
      "red",
      "you@example.com",
      {
        description:
          "Monthly sync with Acme Corp — review integration progress and blockers",
        reminders: [
          { amount: 10, unit: "minutes" },
          { amount: 1, unit: "hours" },
        ],
        calendarEmail: "you@example.com",
        timezone: "GMT-3 Sao Paulo",
        status: "busy",
      },
    ),
    ev("f10b", "Infra Sync", d(2, 10, 14), d(2, 10, 15), "blue", "Work", {
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f11",
      "1:1 with Manager",
      d(2, 11, 15),
      d(2, 11, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Mid-quarter check-in, discuss promotion timeline",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f11b",
      "Security Review",
      d(2, 11, 14),
      d(2, 11, 15, 30),
      "blue",
      "Work",
      {
        description: "Review auth flow security audit findings",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f12", "Sprint Review", d(2, 12, 10), d(2, 12, 11), "blue", "Work", {
      recurrence: "Every 2 weeks on Thu",
      description: "Demo sprint 3 deliverables to stakeholders",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f12b",
      "Perf Monitoring Setup",
      d(2, 12, 10, 30),
      d(2, 12, 11, 30),
      "yellow",
      "Side Projects",
      {
        description: "Set up Lighthouse CI for the component library",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f12c", "Gym", d(2, 12, 18), d(2, 12, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f12d", "Friday Wrap-up", d(2, 13, 16), d(2, 13, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f12e", "Happy Hour", d(2, 13, 17), d(2, 13, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "Wine Bar",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f13",
      "Valentine's Dinner",
      d(2, 14, 19),
      d(2, 14, 21),
      "purple",
      "Personal",
      {
        description:
          "Reservation at that Italian place — don't forget flowers!",
        location: "Trattoria Roma",
        reminders: [
          { amount: 2, unit: "hours" },
          { amount: 1, unit: "days" },
        ],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f14",
      "Valentine's Day",
      d(2, 14, 0),
      d(2, 14, 0),
      "green",
      "Holidays in Brazil",
      { isAllDay: true, calendarEmail: "you@example.com" },
    ),

    // Week of Feb 15 (Sun Feb 15 – Sat Feb 21)
    ev(
      "f15",
      "Team Standup",
      d(2, 16, 9),
      d(2, 16, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev("f16", "Roadmap Sync", d(2, 16, 11), d(2, 16, 12), "blue", "Work", {
      description:
        "Align engineering and product on H1 priorities and delivery dates",
      reminders: [{ amount: 15, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f17",
      "Lunch with Alex",
      d(2, 17, 12),
      d(2, 17, 13),
      "purple",
      "Personal",
      {
        description:
          "He's launching his startup next month — wants feedback on the pitch",
        location: "Chipotle",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f18",
      "Architecture Deep Dive",
      d(2, 18, 13),
      d(2, 18, 15),
      "blue",
      "Work",
      {
        description:
          "Deep dive into event-driven architecture for the notifications service",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f19", "Gym", d(2, 19, 18), d(2, 19, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      description: "HIIT class + core work",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f19b", "Friday Wrap-up", d(2, 20, 16), d(2, 20, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f20", "Happy Hour", d(2, 20, 17), d(2, 20, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      description: "Celebrating Jake's promotion",
      location: "Rooftop Bar",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f21",
      "Presidents' Day",
      d(2, 16, 0),
      d(2, 16, 0),
      "green",
      "Holidays in Brazil",
      { isAllDay: true, calendarEmail: "you@example.com" },
    ),
    ev("f22", "Brunch", d(2, 21, 11), d(2, 21, 13), "orange", "Family", {
      description: "Sister's visiting from out of town",
      location: "The Breakfast Club",
      reminders: [{ amount: 1, unit: "hours" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f23",
      "Blog Post Draft",
      d(2, 18, 10),
      d(2, 18, 11),
      "yellow",
      "Side Projects",
      {
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),

    // Week of Feb 22 (Sun Feb 22 – Sat Feb 28) — busy week with overlaps
    ev(
      "f24",
      "Team Standup",
      d(2, 23, 9),
      d(2, 23, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "f25",
      "Sprint Planning",
      d(2, 23, 10),
      d(2, 23, 11, 30),
      "blue",
      "Work",
      {
        recurrence: "Every 2 weeks on Mon",
        description: "Plan sprint 4 — finalize scope and capacity",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f25b",
      "Investor Update Call",
      d(2, 23, 10, 30),
      d(2, 23, 11),
      "red",
      "you@example.com",
      {
        description: "Quick sync with CFO before investor email goes out",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "f26",
      "UX Research Debrief",
      d(2, 24, 14),
      d(2, 24, 15),
      "blue",
      "Work",
      {
        description:
          "Go over user interview findings from last week's research sessions",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f26b",
      "Design Critique",
      d(2, 24, 14, 30),
      d(2, 24, 15, 30),
      "yellow",
      "Side Projects",
      {
        description: "Review new onboarding flow wireframes with design team",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f26c",
      "Candidate Interview",
      d(2, 24, 15),
      d(2, 24, 16),
      "red",
      "you@example.com",
      {
        description: "Senior frontend engineer — system design round",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "f27",
      "Coffee Chat",
      d(2, 25, 9, 30),
      d(2, 25, 10),
      "purple",
      "Personal",
      { location: "Starbucks Reserve", calendarEmail: "you@example.com" },
    ),
    ev("f27b", "Platform Sync", d(2, 25, 9), d(2, 25, 10, 30), "blue", "Work", {
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f27c", "API Review", d(2, 25, 10), d(2, 25, 11), "blue", "Work", {
      description: "Review REST→GraphQL migration proposal",
      reminders: [{ amount: 5, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f27d",
      "Hiring Debrief",
      d(2, 25, 14),
      d(2, 25, 15),
      "red",
      "you@example.com",
      {
        description: "Debrief on yesterday's candidate — collect scorecards",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f27e",
      "1:1 with Manager",
      d(2, 25, 15),
      d(2, 25, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Weekly sync — promotion timeline update",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f28",
      "Demo Day",
      d(2, 26, 14),
      d(2, 26, 16),
      "red",
      "you@example.com",
      {
        description: "Present Q1 progress to leadership — bring laptop charger",
        location: "Auditorium",
        reminders: [
          { amount: 1, unit: "hours" },
          { amount: 1, unit: "days" },
        ],
        calendarEmail: "you@example.com",
        status: "busy",
        visibility: "public",
      },
    ),
    ev(
      "f28b",
      "Stakeholder Check-in",
      d(2, 26, 14, 30),
      d(2, 26, 15, 30),
      "blue",
      "Work",
      {
        description: "Quick sync with product on demo feedback",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f28c",
      "Side Project Standup",
      d(2, 26, 15),
      d(2, 26, 15, 30),
      "yellow",
      "Side Projects",
      {
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f29", "Retro", d(2, 27, 14), d(2, 27, 15), "blue", "Work", {
      recurrence: "Every 2 weeks on Fri",
      description: "Sprint 3 retro — focus on deployment pipeline improvements",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "f29b",
      "Tech Talk",
      d(2, 27, 14, 30),
      d(2, 27, 15, 30),
      "yellow",
      "Side Projects",
      {
        description: "Internal talk on building accessible UI components",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("f29c", "Friday Wrap-up", d(2, 27, 16), d(2, 27, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f29d", "Happy Hour", d(2, 27, 17), d(2, 27, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      description: "End-of-sprint celebration",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("f30", "Gym", d(2, 26, 18), d(2, 26, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      description: "Yoga + meditation session",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),

    // ── March 2026 ──

    // Week of Mar 1 (Sun Mar 1 – Sat Mar 7)
    ev(
      "m01",
      "Team Standup",
      d(3, 2, 9),
      d(3, 2, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m02",
      "March Priorities",
      d(3, 2, 10),
      d(3, 2, 11, 30),
      "blue",
      "Work",
      {
        description:
          "Set engineering priorities for March — focus on performance and reliability",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m03",
      "Vendor Meeting",
      d(3, 3, 13),
      d(3, 3, 14),
      "red",
      "you@example.com",
      {
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m03b",
      "1:1 with Manager",
      d(3, 4, 15),
      d(3, 4, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Q2 role expectations discussion",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m04",
      "Lunch with Sarah",
      d(3, 4, 12),
      d(3, 4, 13),
      "purple",
      "Personal",
      {
        description: "She got the new job! Celebration lunch",
        location: "Sushi Nakazawa",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m05", "Workshop: Testing", d(3, 5, 9), d(3, 5, 12), "blue", "Work", {
      description:
        "Testing Best Practices — unit tests, integration tests, E2E with Playwright",
      location: "Room 4B",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m06", "Gym", d(3, 5, 18), d(3, 5, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m06b", "Friday Wrap-up", d(3, 6, 16), d(3, 6, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m06c", "Happy Hour", d(3, 6, 17), d(3, 6, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "The Draft House",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m07", "Game Night", d(3, 6, 19), d(3, 6, 22), "orange", "Family", {
      description:
        "Board games at our place — picking up snacks on the way home",
      reminders: [{ amount: 2, unit: "hours" }],
      calendarEmail: "you@example.com",
    }),

    // Week of Mar 8 (Sun Mar 8 – Sat Mar 14) — triple-booked Tuesday
    ev(
      "m08",
      "Team Standup",
      d(3, 9, 9),
      d(3, 9, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m09", "OKR Review", d(3, 9, 10), d(3, 9, 11, 30), "blue", "Work", {
      description: "Mid-quarter OKR progress review with leadership",
      reminders: [{ amount: 15, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m09b",
      "Eng All-Hands",
      d(3, 9, 10),
      d(3, 9, 11),
      "red",
      "you@example.com",
      {
        description:
          "Engineering org all-hands — CTO presenting new tech strategy",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m10",
      "Client Call",
      d(3, 10, 14),
      d(3, 10, 15),
      "red",
      "you@example.com",
      {
        description:
          "Acme Corp escalation — discuss SLA concerns and resolution plan",
        reminders: [
          { amount: 10, unit: "minutes" },
          { amount: 1, unit: "hours" },
        ],
        calendarEmail: "you@example.com",
        timezone: "GMT-3 Sao Paulo",
      },
    ),
    ev(
      "m10b",
      "Sales Enablement",
      d(3, 10, 13, 30),
      d(3, 10, 14, 30),
      "orange",
      "Family",
      {
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m10c",
      "Database Migration Plan",
      d(3, 10, 14),
      d(3, 10, 16),
      "blue",
      "Work",
      {
        description: "Plan PostgreSQL → CockroachDB migration with infra team",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m11",
      "1:1 with Manager",
      d(3, 11, 15),
      d(3, 11, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Discuss tech lead role transition and team restructuring",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m11b",
      "Incident Post-mortem",
      d(3, 11, 14, 30),
      d(3, 11, 15, 30),
      "red",
      "you@example.com",
      {
        description: "Review Tuesday's production outage — identify root cause",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "m11c",
      "Frontend Guild",
      d(3, 11, 15),
      d(3, 11, 16),
      "yellow",
      "Side Projects",
      {
        description: "Monthly frontend guild — discuss React 19 migration plan",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m12",
      "Design Review",
      d(3, 12, 11),
      d(3, 12, 12, 30),
      "yellow",
      "Side Projects",
      {
        description:
          "Review new dark mode color palette for the component library",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m12b", "Gym", d(3, 12, 18), d(3, 12, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m13", "Team Offsite", d(3, 12, 0), d(3, 13, 0), "blue", "Work", {
      isAllDay: true,
      description: "Annual team offsite — team building and strategy sessions",
      calendarEmail: "you@example.com",
    }),
    ev("m13b", "Friday Wrap-up", d(3, 13, 16), d(3, 13, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m14", "Happy Hour", d(3, 13, 17), d(3, 13, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      description: "Post-offsite drinks to unwind",
      location: "The Pub",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),

    // Week of Mar 15 (Sun Mar 15 – Sat Mar 21)
    ev(
      "m15",
      "Team Standup",
      d(3, 16, 9),
      d(3, 16, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m16",
      "Sprint Planning",
      d(3, 16, 10),
      d(3, 16, 11, 30),
      "blue",
      "Work",
      {
        recurrence: "Every 2 weeks on Mon",
        description: "Sprint 5 planning — final sprint before Q1 wrap",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m17",
      "Lunch with Alex",
      d(3, 17, 12),
      d(3, 17, 13),
      "purple",
      "Personal",
      {
        description: "Trying the new Thai place he keeps recommending",
        location: "Thai Basil",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m17b",
      "1:1 with Manager",
      d(3, 18, 15),
      d(3, 18, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Annual review prep discussion",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m18",
      "Perf Review Prep",
      d(3, 18, 14),
      d(3, 18, 15, 30),
      "red",
      "you@example.com",
      {
        description:
          "Write self-review and gather peer feedback for annual review cycle",
        reminders: [{ amount: 30, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m19",
      "Side Project Sync",
      d(3, 19, 13),
      d(3, 19, 14),
      "yellow",
      "Side Projects",
      {
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m20", "Gym", d(3, 19, 18), d(3, 19, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      description: "Spin class + abs",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m20b", "Friday Wrap-up", d(3, 20, 16), d(3, 20, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m20c", "Happy Hour", d(3, 20, 17), d(3, 20, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      location: "Irish Pub",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m21",
      "St. Patrick's Day",
      d(3, 17, 0),
      d(3, 17, 0),
      "green",
      "Holidays in Brazil",
      { isAllDay: true, calendarEmail: "you@example.com" },
    ),

    // Week of Mar 22 (Sun Mar 22 – Sat Mar 28)
    ev(
      "m22",
      "Team Standup",
      d(3, 23, 9),
      d(3, 23, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m23", "Q1 Wrap-up", d(3, 23, 10), d(3, 23, 12), "blue", "Work", {
      description:
        "Final Q1 summary meeting — present achievements, lessons learned, and Q2 outlook",
      reminders: [
        { amount: 15, unit: "minutes" },
        { amount: 1, unit: "days" },
      ],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m24",
      "Client Demo",
      d(3, 24, 14),
      d(3, 24, 15, 30),
      "red",
      "you@example.com",
      {
        description: "Final demo of the new reporting dashboard to Acme Corp",
        reminders: [{ amount: 30, unit: "minutes" }],
        calendarEmail: "you@example.com",
        status: "busy",
      },
    ),
    ev(
      "m24b",
      "1:1 with Manager",
      d(3, 25, 15),
      d(3, 25, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Q1 wrap-up and Q2 expectations",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m25",
      "Architecture Review",
      d(3, 25, 13),
      d(3, 25, 14, 30),
      "blue",
      "Work",
      {
        description: "Review database sharding proposal and caching strategy",
        reminders: [{ amount: 15, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m26", "Sprint Review", d(3, 26, 10), d(3, 26, 11), "blue", "Work", {
      recurrence: "Every 2 weeks on Thu",
      description: "Demo sprint 5 features — focus on performance improvements",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m27", "Retro", d(3, 27, 14), d(3, 27, 15), "blue", "Work", {
      recurrence: "Every 2 weeks on Fri",
      description:
        "Q1 final retro — what worked, what didn't, action items for Q2",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m27b", "Friday Wrap-up", d(3, 27, 16), d(3, 27, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m27c", "Happy Hour", d(3, 27, 17), d(3, 27, 19), "purple", "Personal", {
      recurrence: "Every week on Fri",
      description: "End-of-quarter celebration drinks",
      location: "The Rooftop",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m28", "Gym", d(3, 26, 18), d(3, 26, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      description: "Boxing class + cool down",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m29",
      "Birthday Party",
      d(3, 28, 15),
      d(3, 28, 18),
      "orange",
      "Family",
      {
        description: "Nephew's 5th birthday — bring the Lego set we got him",
        location: "Fun Zone",
        reminders: [
          { amount: 2, unit: "hours" },
          { amount: 1, unit: "days" },
        ],
        calendarEmail: "you@example.com",
      },
    ),

    // Week of Mar 29 (Sun Mar 29 – Sat Apr 4)
    ev(
      "m30",
      "Team Standup",
      d(3, 30, 9),
      d(3, 30, 9, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Mon",
        description: "Daily sync — blockers, progress, priorities",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m31", "Q2 Planning", d(3, 30, 10), d(3, 30, 12), "blue", "Work", {
      description:
        "Kick off Q2 planning — define themes, allocate resources, set milestones",
      reminders: [
        { amount: 15, unit: "minutes" },
        { amount: 1, unit: "days" },
      ],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m31b",
      "1:1 with Manager",
      d(4, 1, 15),
      d(4, 1, 15, 30),
      "red",
      "you@example.com",
      {
        recurrence: "Every week on Wed",
        description: "Q2 kickoff goals alignment",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev("m31c", "Gym", d(4, 2, 18), d(4, 2, 19, 30), "green", "Fitness", {
      recurrence: "Every week on Thu",
      reminders: [{ amount: 30, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev("m31d", "Friday Wrap-up", d(4, 3, 16), d(4, 3, 17), "blue", "Work", {
      recurrence: "Every week on Fri",
      description: "Review weekly accomplishments and set Monday priorities",
      reminders: [{ amount: 10, unit: "minutes" }],
      calendarEmail: "you@example.com",
    }),
    ev(
      "m32",
      "Month-End Report",
      d(3, 31, 10),
      d(3, 31, 11, 30),
      "red",
      "you@example.com",
      {
        description:
          "Compile March metrics, budget reconciliation, and Q1 summary for finance",
        reminders: [{ amount: 1, unit: "hours" }],
        calendarEmail: "you@example.com",
      },
    ),

    // ── Historical Sprint events (for search testing) ──
    ev(
      "h01",
      "Sprint Kickoff — Q2 Platform Migration Initiative",
      dy(2024, 6, 10, 9),
      dy(2024, 6, 10, 10, 30),
      "blue",
      "Work",
      {
        description: "Q2 2024 sprint kickoff — defining team velocity baseline",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "h02",
      "Sprint Retrospective — Process Improvements and Velocity Analysis",
      dy(2025, 3, 14, 14),
      dy(2025, 3, 14, 15),
      "blue",
      "Work",
      {
        description: "Q1 2025 sprint retro — process improvements discussion",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),

    // ── Extra Sprint events on Mon Feb 23 2026 ──
    ev(
      "f25c",
      "Sprint Demo — Presenting New Dashboard Features to Stakeholders",
      d(2, 23, 14),
      d(2, 23, 15),
      "red",
      "you@example.com",
      {
        description: "Demo sprint 4 deliverables to product team",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "f25d",
      "Sprint Retro",
      d(2, 23, 15, 30),
      d(2, 23, 16, 30),
      "yellow",
      "Side Projects",
      {
        description: "Sprint 4 retrospective — team feedback session",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),

    // ── Sprint events on Mar 18 and Mar 19 2026 ──
    ev(
      "m17c",
      "Sprint Standup",
      d(3, 18, 9, 30),
      d(3, 18, 10),
      "red",
      "you@example.com",
      {
        description: "Mid-sprint sync — check blockers and progress",
        reminders: [{ amount: 5, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
    ev(
      "m19b",
      "Sprint Grooming — Backlog Refinement and Story Estimation Session",
      d(3, 19, 10),
      d(3, 19, 11),
      "blue",
      "Work",
      {
        description:
          "Backlog grooming for next sprint — estimate and prioritize stories",
        reminders: [{ amount: 10, unit: "minutes" }],
        calendarEmail: "you@example.com",
      },
    ),
  ];
}
