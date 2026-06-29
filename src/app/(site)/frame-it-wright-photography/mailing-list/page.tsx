import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { PhotographyShell } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "photography mailing list",
  description: "Join the Frame It Wright Photography mailing list.",
};

const photographyInterests = [
  { value: "portraits", label: "portraits" },
  { value: "couples", label: "couples" },
  { value: "families", label: "families" },
  { value: "events", label: "events" },
  { value: "graduation", label: "graduation" },
  { value: "creative collaboration", label: "creative collaboration" },
  { value: "prints", label: "prints" },
  { value: "just following along", label: "just following along" },
];

export default function PhotographyMailingListPage() {
  return (
    <PhotographyShell title="mailing list">
      <p className="max-w-xl text-stone-500">
        A quiet list for photography availability, booking windows, print drops, and creative collaborations.
      </p>
      <div className="not-prose mt-8 max-w-2xl border-t border-stone-300 pt-7 dark:border-stone-700">
        <NewsletterSignup
          endpoint="/api/photography/mailing-list/subscribe"
          successMessage="You’re on the photography list—thank you!"
          description="Occasional Frame It Wright Photography updates. Unsubscribe whenever you like."
          submitLabel="join the photography list"
          interestName="photographyInterest"
          interestLabel="most interested in"
          interestOptions={photographyInterests}
          extraFields={[
            {
              name: "location",
              label: "location",
              autoComplete: "address-level2",
              maxLength: 120,
              placeholder: "city, state",
            },
            {
              name: "notes",
              label: "anything I should know?",
              type: "textarea",
              maxLength: 500,
              placeholder: "timing, shoot ideas, print interests, or anything else",
            },
          ]}
        />
      </div>
    </PhotographyShell>
  );
}
