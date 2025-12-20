"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ----- Subcomponents -----
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card relative w-full rounded-xl dark:bg-transparent p-1.5 shadow-xl backdrop-blur-xl dark:border-border/80 border",
        className,
      )}
      {...props}
    />
  );
}

function Header({
  children,
  className,
  glassEffect = true,
  ...props
}: React.ComponentProps<"div"> & { glassEffect?: boolean }) {
  return (
    <div
      className={cn(
        "bg-muted/80 dark:bg-muted/50 relative mb-4 rounded-xl border p-4",
        className,
      )}
      {...props}
    >
      {glassEffect && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-xs", className)} {...props} />
  );
}

function PlanName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm font-medium [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-foreground/20 text-foreground/80 rounded-full border px-2 py-0.5 text-xs",
        className,
      )}
      {...props}
    />
  );
}

function Price({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mb-3 flex items-end gap-1", className)} {...props} />
  );
}

function MainPrice({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-3xl font-extrabold tracking-tight", className)}
      {...props}
    />
  );
}

function Period({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-foreground/80 pb-1 text-sm", className)}
      {...props}
    />
  );
}

function Body({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-6 p-3", className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("space-y-3", className)} {...props} />;
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "text-muted-foreground flex items-start gap-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}

function Separator({
  children = "Upgrade to access",
  className,
  ...props
}: React.ComponentProps<"div"> & { children?: string }) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center gap-3 text-sm",
        className,
      )}
      {...props}
    >
      <span className="bg-muted-foreground/40 h-[1px] flex-1" />
      <span className="text-muted-foreground shrink-0">{children}</span>
      <span className="bg-muted-foreground/40 h-[1px] flex-1" />
    </div>
  );
}

// ----- Configurable PricingTiers Component -----
export interface Plan {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  badge?: string;
}

interface PricingTiersProps {
  plans: Plan[];
  heading?: string;
  subheading?: string;
}

export default function PricingTiers({
  plans,
  heading = "Flexible Plans for Everyone",
  subheading = "Choose the plan that fits your workflow and budget.",
}: PricingTiersProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-semibold lg:text-5xl">{heading}</h1>
          <Description>{subheading}</Description>
        </div>

        <div className="mt-12 grid gap-6 md:mt-20 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <Card key={idx}>
              <Header glassEffect>
                <div className="flex flex-col items-start justify-between">
                  <PlanName>
                    {plan.title} {plan.badge && <Badge>{plan.badge}</Badge>}
                  </PlanName>
                  <Price>
                    <MainPrice>{plan.price}</MainPrice>
                    <Period>{plan.period}</Period>
                  </Price>
                </div>
                <Description>{plan.description}</Description>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="#">Get Started</Link>
                </Button>
              </Header>

              <Body>
                <Separator />
                <List>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i} className="flex items-center gap-2">
                      <Check className="size-4 text-foreground" />
                      {feature}
                    </ListItem>
                  ))}
                </List>
              </Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
