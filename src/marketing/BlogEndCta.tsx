import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEMO_PATH, PRODUCT_NAME } from "@/brand";

/**
 * Branded end-of-post CTA — nudges readers from the blog/guide into a demo.
 * Shared by the guides, the landing blog and the in-app blog.
 *
 * In-site nav (not goToApp): /demo lives on this same origin, so a hard
 * cross-origin jump to app.classquill.com would be wrong here.
 *
 * `variant="cta"` is what every other primary marketing CTA uses — it carries
 * the brand gradient and opts into `--button-radius-primary`, which resolves per
 * surface with no work here: a pill under `[data-surface="landing"]` (guides,
 * landing blog) and the app's `--control-radius` on the in-app blog. The icon is
 * a calendar to match every other "Book a demo" on the site; it previously used
 * an arrow, which read as "next page" rather than "book something".
 */
export default function BlogEndCta() {
  const navigate = useNavigate();
  return (
    <Card className="mt-12 bg-neutral-subdued">
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            See {PRODUCT_NAME} in action
          </h3>
          <p className="text-sm text-muted-foreground">
            The operating system for your tutoring business — book a quick walkthrough.
          </p>
        </div>
        <Button
          size="lg"
          variant="cta"
          onClick={() => navigate(DEMO_PATH)}
          className="shrink-0 gap-2 px-8 font-semibold"
        >
          <Calendar className="size-4" />
          Book a demo
        </Button>
      </CardContent>
    </Card>
  );
}
