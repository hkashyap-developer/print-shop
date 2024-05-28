import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/client";

const EVENTS_QUERY = `*[_type == "event"]{_id, name, slug, date}|order(date desc)`;

export default async function IndexPage() {
  const events = await sanityFetch<SanityDocument[]>({query: EVENTS_QUERY});

  return (
      <>
      <h1 className="text-4xl font-bold tracking-tighter p-8">
        Events
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2 p-8">
        {events.map((event) => (
          <li
            className=""
            key={event._id}
          >
            <Link
              className="hover:underline"
              href={`/events/${event.slug.current}`}
            >
              <h2 className="text-xl font-semibold">{event?.name}</h2>
              <p className="text-gray-500">
                {new Date(event?.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      </>
  );
}