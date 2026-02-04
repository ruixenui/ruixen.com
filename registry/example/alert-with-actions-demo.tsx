import AlertWithActions from "@/registry/ruixenui/alert-with-actions";

export default function AlertWithActionsDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-3">
        <AlertWithActions
          variant="error"
          title="Payment failed"
          description="Your card was declined. Please update your payment method to continue."
          actions={
            <>
              <button className="text-xs font-medium text-card-foreground underline underline-offset-2 hover:no-underline">
                Update billing
              </button>
              <button className="text-xs text-muted-foreground hover:text-card-foreground">
                Contact support
              </button>
            </>
          }
          onDismiss={() => {}}
        />
        <AlertWithActions
          variant="info"
          title="New update available"
          description="Version 2.0 is ready with new features and performance improvements."
          actions={
            <button className="text-xs font-medium text-card-foreground underline underline-offset-2 hover:no-underline">
              View changelog
            </button>
          }
          onDismiss={() => {}}
        />
        <AlertWithActions
          variant="success"
          title="Deployment complete"
          description="Your changes are now live in production."
        />
      </div>
    </div>
  );
}
