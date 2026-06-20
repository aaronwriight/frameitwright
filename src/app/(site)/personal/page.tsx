import type { Metadata } from "next";
import Link from "next/link";
import { PersonalShell } from "@/components/site/site-content";
export const metadata: Metadata = {
  title: "personal",
  description: "favorite stories, communities, and inspirations",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`)
};

export default function PersonalPage() {
  return (
    <PersonalShell title="personal">
      <p>
        <strong>
          I <em>love</em> a good story.
        </strong>
      </p>
      <p>
        I hold a variety of things in my heart, many of which have shaped my approach to cognitive science. I am deeply inspired by the great
        outdoors and music, and yet no singular peak, terrestrial or acoustic, reflects my whole story. Everything below has been uniquely impactful,
        whether challenging me to reconcile my understanding of different aspects of humanity, or providing touchpoints to couch my studies in
        creativity.
      </p>

      <details>
        <summary className="cursor-pointer list-none text-[#6f8200]">art & media</summary>
        <p>
          <strong>Artists & Albums</strong>
        </p>
        <p>
          <Link href="https://open.spotify.com/album/7EOvtHDxbltA0GNC4mvLAC"><em>The Definition</em></Link>, Jon Bellion |{" "}
          <Link href="https://open.spotify.com/album/1HiN2YXZcc3EjmVZ4WjfBk"><em>Everybody</em></Link>, Logic |{" "}
          <Link href="https://open.spotify.com/album/6B3LAqHoBKmSN9HLbyy0Ro"><em>Change of Scenery II</em></Link>, Quinn XCII |{" "}
          <Link href="https://open.spotify.com/album/2UrPmvaX5X76LIzE6Cfiqu"><em>Brol La Suite</em></Link>, Angele |{" "}
          <Link href="https://open.spotify.com/album/42SAgjuUp25kQT9I04ph1w"><em>Rainbow Mixtape</em></Link>, COIN |{" "}
          <Link href="https://open.spotify.com/album/1k7iymTuRK6I4tvn0SX38I"><em>Songs For The Canyon</em></Link>, John Vincent III
        </p>
        <p>
          <strong>Film</strong>
          <br />
          La La Land | A Quiet Place | Good Will Hunting | Spirited Away
        </p>
        <p>
          <strong>Literature</strong>
          <br />
          <em>Anne of Green Gables</em>, Lucy Maud Montgomery | <em>The Haunting of Hill House</em>, Shirley Jackson |{" "}
          <em>A Girl of the Limberlost</em>, Gene Stratton-Porter
        </p>
        <p>
          <strong>Podcasts</strong>
          <br />
          Pocket-sized science with hand-picked experts: <Link href="https://www.alieward.com">Ologies with Alie Ward</Link>
        </p>
      </details>

      <details>
        <summary className="cursor-pointer list-none text-[#6f8200]">communities</summary>
        <ul>
          <li>
            My home away from science: <Link href="https://lavidacenter.org">La Vida At Gordon College</Link>
          </li>
          <li>
            Nurturing inclusivity, presence, and creativity: <Link href="https://compasspath.org">Compass</Link>
          </li>
        </ul>
      </details>

      <details>
        <summary className="cursor-pointer list-none text-[#6f8200]">creative initiatives & inspirations</summary>
        <ul>
          <li>
            My talented friend and storyteller, Eden Harfield, at{" "}
            <Link href="https://www.edengracecreative.com">Eden Grace Creative</Link>
          </li>
          <li>
            Mesmerizing paintings and sketches done by my friend,{" "}
            <Link href="https://www.instagram.com/jameswellborn.art/">James Wellborn</Link>
          </li>
          <li>
            <Link href="https://www.etsy.com/shop/PhebeSunriseStudio">Phebe Sunrise Studio</Link>, a Maine-inspired print shop by{" "}
            Kennebunk, ME-based artist (and long-time friend),{" "}
            <Link href="https://www.instagram.com/phebegrant.art/">Phebe Grant</Link>
          </li>
          <li>
            Data visualization and information design by <Link href="https://www.cedricscherer.com">Cédric Scherer</Link>
          </li>
          <li>
            Transforming data into understanding: <Link href="https://nrennie.rbind.io">Nicola Rennie</Link>
          </li>
          <li>
            Thomas Brasington&apos;s stunning photographic journal, <Link href="https://www.thepostchaise.com">The Post Chaise</Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/newnativephotography/">New Native Photography</Link>: elopement and weddings, captured by Lindsey
            Tillman
          </li>
          <li>
            A carousel of creative services, inspiration, and encouragement by my friend,{" "}
            <Link href="https://www.melissazaldivar.com/">Melissa Zaldivar Sawyer</Link>
          </li>
          <li>
            The independent design studio, <Link href="https://houseofdakh.com/">HOUSEOFDAKH</Link>
          </li>
          <li>
            Landscape photography by <Link href="https://www.frihead.ch/">Mathilde Rietsch</Link>
          </li>
          <li>
            Jon Bellion&apos;s <Link href="https://www.beautifulmindprojects.com/">Beautiful Mind Projects</Link>
          </li>
          <li>
            Classical composer, <Link href="https://www.christopherdenniscoleman.com/">Christopher Dennis Coleman</Link>
          </li>
          <li>
            The gripping memoir, <em>I&apos;m Glad My Mom Died</em>, from <Link href="https://www.jennettemccurdy.com/">Jennette McCurdy</Link>
          </li>
        </ul>
      </details>
    </PersonalShell>
  );
}
