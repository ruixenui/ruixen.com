"use client";

import {
  ReviewFilterGroup,
  ReviewFilterItem,
} from "@/registry/ruixenui/review-filter-bars";

function DemoPage() {
  const total = 12921;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Filter by rating</h2>
      <p className="text-sm text-muted-foreground">
        Select a review group to filter results.
      </p>

      <ReviewFilterGroup defaultValue="all">
        <ReviewFilterItem
          value="5-stars"
          stars={5}
          count={5168}
          total={total}
        />
        <ReviewFilterItem
          value="4-stars"
          stars={4}
          count={4726}
          total={total}
        />
        <ReviewFilterItem
          value="3-stars"
          stars={3}
          count={3234}
          total={total}
        />
        <ReviewFilterItem
          value="2-stars"
          stars={2}
          count={1842}
          total={total}
        />
        <ReviewFilterItem value="1-star" stars={1} count={452} total={total} />
      </ReviewFilterGroup>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export default DemoPage;
